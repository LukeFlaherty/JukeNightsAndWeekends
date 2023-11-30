"use client";

import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  smartWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { ACCOUNT_FACTORY_ADDRESS } from "@/constants/addresses";

interface ThirdwebProviderProps {
  children: React.ReactNode;
}

// use the chain your contracts are deployed to
const activeChain = "mumbai";

const Providers: React.FC<ThirdwebProviderProps> = ({ children }) => {
  const smartWalletConfig = {
    factoryAddress: ACCOUNT_FACTORY_ADDRESS,
    gasless: true,
  };

  return (
    // Add a return statement here
    <ThirdwebProvider
      supportedWallets={[
        smartWallet(embeddedWallet(), smartWalletConfig),
        // metamaskWallet(),
        // coinbaseWallet(),
        // smartWallet(metamaskWallet(), smartWalletConfig),
      ]}
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default Providers;
