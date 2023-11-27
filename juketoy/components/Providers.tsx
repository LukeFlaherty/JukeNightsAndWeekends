"use client";

// TODO: Move all providers into here
import { ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import { RedlightChain } from "@thirdweb-dev/chains";

interface ThirdwebProviderProps {
  children: React.ReactNode;
}

// NOT USED ANYWHERE RN, Set up for when I want to migrate them all to here

const Providers: React.FC<ThirdwebProviderProps> = ({ children }) => {
  return (
    // Add a return statement here
    <ThirdwebProvider
      supportedWallets={[metamaskWallet()]}
      activeChain={RedlightChain}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default Providers;
