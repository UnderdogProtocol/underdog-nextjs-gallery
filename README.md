# Underdog Gallery

This is a Next.js starter

## Quick Start

1. Install dependencies

```
yarn
```

2. Run the development server

```
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

### Configuration

| Variable | Description | Example
| --- | --- | --- |
| `APP_URL` | The URL of the app used to redirect after a successful payment on the Sphere checkout page | [https://gallery.underdogprotocol.com](https://gallery.underdogprotocol.com) |
| `NEXT_PUBLIC_APP_NAME` | The name of the app used in the header | Underdog Gallery |
| `NEXT_PUBLIC_NETWORK` | Either MAINNET for Solana mainnet-beta or DEVNET for Solana devnet  | DEVNET |
| `UNDERDOG_API_KEY` | Key to authenticate your Underdog requests generated from [https://app.underdogprotocol.com/apikeys](https://app.underdogprotocol.com/apikeys) | 1cc491851db99d.aasdfasdf342423524531242 |
| `SPHERE_API_KEY` | Key to authenticate your Sphere requests generated from [https://spherepay.co/dashboard/developers/api-keys](https://spherepay.co/dashboard/developers/api-keys) | secret_aasdfasdf342423524531242 |
| `SPHERE_WEBHOOK_SECRET` | Secret to validate webhook requests sent from Sphere | secret_123dsafdsafadsf |

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FUnderdogProtocol%2Funderdog-nextjs-gallery&env=UNDERDOG_API_KEY,SPHERE_API_KEY,APP_URL,NEXT_PUBLIC_APP_NAME,NEXT_PUBLIC_NETWORK,SPHERE_WEBHOOK_SECRET&envDescription=You%20can%20grab%20your%20Underdog%20API%20Key&envLink=https%3A%2F%2Fapp.underdogprotocol.com)
