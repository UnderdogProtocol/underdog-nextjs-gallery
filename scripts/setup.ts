import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";

import { NetworkEnum, TransactionTypesEnum } from "@underdog-protocol/js";
import { createUnderdogClient } from "@underdog-protocol/js";

const envPath = path.join(__dirname, "../.env.local");
dotenv.config({ path: envPath });

const main = async () => {
  if (!process.env.UNDERDOG_API_KEY) {
    throw new Error(
      "Get your UNDERDOG_API_KEY from https://app.underdogprotocol.com/apikeys"
    );
  }

  if (!process.env.SPHERE_API_KEY) {
    throw new Error(
      "Get your SPHERE_API_KEY from https://spherepay.co/dashboard/developers/api-keys"
    );
  }

  if (!process.env.APP_URL) {
    throw new Error("Set APP_URL to your website domain");
  }

  if (!process.env.NEXT_PUBLIC_NETWORK) {
    throw new Error(
      "Set NEXT_PUBLIC_NETWORK to either MAINNET (for production) or DEVNET (for testing)"
    );
  }

  const underdogClient = createUnderdogClient({
    network: process.env.NEXT_PUBLIC_NETWORK as NetworkEnum,
    apiKey: process.env.UNDERDOG_API_KEY,
  });

  console.log("Creating Underdog Webhook...");
  await underdogClient.createWebhook({
    body: {
      url: `${process.env.APP_URL}/api/underdog/webhooks`,
      triggers: [TransactionTypesEnum.ProjectCreate],
    },
  });
  console.log("Created Underdog Webhook");

  console.log("Creating Sphere Webhook...");
  const response = await axios.post(
    "https://api.spherepay.co/v1/webhook",
    {
      events: ["payment.successful"],
      url: `${process.env.APP_URL}/api/sphere/webhooks`,
    },
    { headers: { Authorization: `Bearer ${process.env.SPHERE_API_KEY}` } }
  );
  console.log("Created Sphere Webhook");

  const envFile = fs.readFileSync(envPath, "utf8");
  const newEnvFile = envFile
    .split("\n")
    .map((line) => {
      if (line.startsWith("SPHERE_WEBHOOK_SECRET=")) {
        return `SPHERE_WEBHOOK_SECRET=${response.data.data.webhook.secret}`;
      }
      return line;
    })
    .join("\n");

  // Write the updated content back to the file
  fs.writeFileSync(envPath, newEnvFile);

  console.log(`SPHERE_WEBHOOK_SECRET updated to ${response.data.data.webhook.secret}`);
};

main();
