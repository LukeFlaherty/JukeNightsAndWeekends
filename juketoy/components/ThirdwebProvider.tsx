"use client";

import React from "react";
import {
  ThirdwebProvider as ThirdwebProviderBase,
  WalletConfig,
} from "@thirdweb-dev/react";
import { Gnosis } from "@thirdweb-dev/chains";
import { metamaskWallet, coinbaseWallet } from "@thirdweb-dev/react";
import type { MetaMaskWallet, CoinbaseWallet } from "@thirdweb-dev/wallets";

interface ThirdwebProviderProps {
  supportedWallets: WalletConfig<MetaMaskWallet | CoinbaseWallet>[];
  activeChain: typeof Gnosis;
  clientId: string | undefined;
  children: React.ReactNode;
}

export function ThirdwebProvider({
  children,
  supportedWallets,
  activeChain,
  clientId,
}: ThirdwebProviderProps) {
  return (
    <ThirdwebProviderBase
      supportedWallets={supportedWallets}
      activeChain={activeChain}
      clientId={clientId}
    >
      {children}
    </ThirdwebProviderBase>
  );
}
