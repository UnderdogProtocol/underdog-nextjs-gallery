import { UnderdogProvider } from "@underdog-protocol/js";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <UnderdogProvider>{children}</UnderdogProvider>;
}
