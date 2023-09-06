"use client";

import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
} from "@thirdweb-dev/react";
import { Gnosis } from "@thirdweb-dev/chains";

interface ThirdwebProviderProps {
  children: React.ReactNode;
}

const Providers: React.FC<ThirdwebProviderProps> = ({ children }) => {
  return (
    // Add a return statement here
    <ThirdwebProvider
      supportedWallets={[metamaskWallet(), coinbaseWallet()]}
      activeChain={Gnosis}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default Providers;
