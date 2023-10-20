import { underdogClient } from "@/lib/underdog";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (process.env.SPHERE_WEBHOOK_SECRET) {
      const signature = crypto
        .createHmac("sha256", Buffer.from(process.env.SPHERE_WEBHOOK_SECRET!))
        .update(JSON.stringify(req.body), "utf8")
        .digest("hex");

      if (signature !== req.headers["signature"]) {
        console.error("Invalid signature. Request rejected.");
        return res.status(403).json({ message: "Not OK: Invalid signature" });
      }
    }

    if (req.method === "POST") {
      const projectId =
        req.body.data.payment.paymentLink.lineItems[0].price.product.meta
          .projectId;

      if (projectId) {
        const receiverAddress = req.body.data.payment.customer.solanaPubKey;
        const quantity = req.body.data.payment.paymentLink.lineItems[0].quantity;

        // Add additional logging
        console.log("Received a valid request. Project ID:", projectId);
        console.log("Receiver Address:", receiverAddress);
        console.log("Quantity:", quantity);

        // Create an array of SFT items to mint
        const sftItems = Array.from({ length: quantity }, () => ({ receiverAddress }));

        try {
          // Mint SFTs using batchSft function
          await underdogClient.batchSft({
            params: { projectId },
            body: sftItems,
          });

          console.log(`Successfully created ${quantity} SFTs for project: ${projectId}`);
          return res.status(200).json({ message: "OK" });
        } catch (error) {
          console.error("Error creating SFTs:", error);
        }
      }
    }

    console.error("Invalid request. Project ID not found.");
    res.status(400).json({ message: "Not OK: Invalid request" });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ message: "Not OK: Server error" });
  }
};

export default handler;
