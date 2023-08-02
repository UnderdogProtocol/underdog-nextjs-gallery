import { underdogClient } from "@/lib/underdog";
import { CreateProjectPayload } from "@underdog-protocol/types";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_URL = "https://api.spherepay.co/v1";
const headers = { Authorization: `Bearer ${process.env.SPHERE_API_KEY}` };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data: CreateProjectPayload = req.body.data;

    const project = await underdogClient.getProject({
      params: { projectId: data.projectId },
      query: {
        page: 1,
        limit: 0,
        orderBy: "asc",
        sortBy: undefined,
      },
    });

    const createProductResponse = await axios.post(
      `${API_URL}/product`,
      {
        name: project.name,
        description: project.description,
        images: [project.image],
        meta: { projectId: project.id },
      },
      { headers }
    );
    const product = createProductResponse.data.data.product;

    console.log(product);

    const createPriceResponse = await axios.post(
      `${API_URL}/price`,
      {
        currency: "So11111111111111111111111111111111111111112",
        product: product.id,
        type: "oneTime",
        unitAmount: "100000000",
      },
      { headers }
    );
    const price = createPriceResponse.data.data.price;

    console.log(price);

    const paymentLinkResponse = await axios.post(
      `${API_URL}/paymentLink`,
      {
        successUrl: `${process.env.APP_URL}/${project.id}`,
        failUrl: `${process.env.APP_URL}/${project.id}`,
        lineItems: [
          {
            price: price.id,
            quantity: 1,
            quantityMutable: false,
          },
        ],
      },
      { headers }
    );
    const paymentLink = paymentLinkResponse.data.data.paymentLink;

    console.log(paymentLink);

    const updatedProject = await underdogClient.partialUpdateProject({
      params: { projectId: project.id },
      body: { attributes: { paymentLink: paymentLink.url } },
    });

    console.log(updatedProject);

    res.json({ message: "Success" });
  }
};

export default handler;
