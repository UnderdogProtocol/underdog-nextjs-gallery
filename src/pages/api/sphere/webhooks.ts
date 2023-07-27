import axios from "axios";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const productIdToProjectId: Record<string, number> = {
  product_6ce985887360493598c7a5be2a1cfb0a: 2,
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const signature = crypto
    .createHmac("sha256", Buffer.from(process.env.SPHERE_WEBHOOK_SECRET!))
    .update(JSON.stringify(req.body), "utf8")
    .digest("hex");

  if (signature !== req.headers["signature"]) {
    return res.status(403).json({ message: "Not OK" });
  }

  if (req.method === "POST") {
    const projectId =
      productIdToProjectId[
        req.body.data.payment.paymentLink.lineItems[0].price.product.id
      ];

    if (projectId) {
      const receiverAddress = req.body.data.payment.customer.solanaPubKey;

      const options = {
        method: "POST",
        url: "https://api.underdogprotocol.com/v2/projects/2/sfts",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${process.env.UNDERDOG_API_KEY}`,
        },
        data: { receiverAddress },
      };

      await axios.request(options);

      return res.status(200).json({ message: "OK" });
    }
  }

  res.status(400).json({ message: "Not OK" });
};

export default handler;
