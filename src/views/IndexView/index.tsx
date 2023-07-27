import { PoweredByUnderdog } from "@/components/PoweredByUnderdog";
import { useUnderdogClient } from "@/hooks/useUnderdogClient";
import { useWallet } from "@solana/wallet-adapter-react";
import { NetworkEnum } from "@underdog-protocol/js";
import { useProject } from "@underdog-protocol/js";

const projectId = 2;

export function IndexView() {
  const underdogClient = useUnderdogClient(NetworkEnum.Mainnet);

  const { publicKey } = useWallet();

  const { project } = useProject(
    {
      params: { projectId },
      query: { page: 1, limit: 5, orderBy: "desc" },
    },
    underdogClient
  );

  if (!project) return null;

  const getXrayNftLink = (mintAddress: string) =>
    `https://xray.helius.xyz/token/${mintAddress}`;

  return (
    <main className="flex min-h-screen flex-col items-center py-8 space-y-8 max-w-sm mx-auto w-full">
      <div className="space-y-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-white">
          Tardigrade Sunrise
        </h1>

        <img src={project.image} />

        <a href="https://spherepay.co/pay/paymentLink_e0a14f8ab1ee4db281db0b328e72152a">
          <button className="bg-blue-400 p-4 rounded">
            Buy for 1 SOL
          </button>
        </a>

      </div>

      <PoweredByUnderdog />
    </main>
  );
}
