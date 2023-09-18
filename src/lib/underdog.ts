import { NetworkEnum, createUnderdogClient } from "@underdog-protocol/js";

export const underdogClient = createUnderdogClient({
  network: process.env.NEXT_PUBLIC_NETWORK as NetworkEnum,
  apiKey: process.env.UNDERDOG_API_KEY!,
});
