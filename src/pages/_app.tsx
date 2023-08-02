import { PoweredByUnderdog } from "@/components/PoweredByUnderdog";
import { Providers } from "@/components/Providers";
import type { AppProps } from "next/app";
import Head from "next/head";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Providers>
        <Head>
          <title>{process.env.NEXT_PUBLIC_APP_NAME || "Gallery | Underdog Protocol"}</title>
        </Head>

        <Component {...pageProps} />
      </Providers>

      <div className="py-8 flex justify-center">
        <PoweredByUnderdog />
      </div>
    </>
  );
}
