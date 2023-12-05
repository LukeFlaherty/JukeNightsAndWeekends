"use client";

import React, { useState } from "react";
import {
  useAddress,
  useContract,
  useMintToken,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import TokenInput from "./TokenInput";
import JukeBalance from "./JukeBalance";
import Button from "@/components/Button";

const BuyJukeContent: React.FC = () => {
  const [amount, setAmount] = useState("");
  const address = useAddress(); // Get the connected wallet address
  const router = useRouter();

  const { contract } = useContract(
    "0x875bd9Db81732Be0585f8808F0c56bDB074747c3"
  );
  const { data: tokenBalance } = useTokenBalance(contract, address);

  const {
    mutate: mintTokens,
    isLoading: isMinting,
    error,
  } = useMintToken(contract);

  const handleBuyTokens = () => {
    if (!address) {
      alert("No wallet connected");
      return;
    }

    const tokenAmount = Number(amount);
    if (isNaN(tokenAmount) || tokenAmount <= 0) {
      alert("Please enter a valid number of tokens to mint.");
      return;
    }

    mintTokens({ to: address, amount: tokenAmount });
  };

  const isAmountValid = (amount: string) => {
    const num = Number(amount);
    return num > 0 && num < 100;
  };

  if (error) {
    console.error("Failed to mint tokens", error);
  }

  const redirectToAccount = () => {
    router.push("/account");
  };

  if (!address) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Purchase Juke Tokens</h2>
        <p className="mb-4">
          To start supporting your favorite artists, you&apos;ll need to connect
          your Payment Account in your Account Settings first.
        </p>
        <button
          onClick={redirectToAccount}
          className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-mainBrandColor hover:bg-mainBrandColorDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBrandColor"
        >
          Account Settings
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Buy Juke Tokens</h2>
      {address && (
        <JukeBalance
          balance={tokenBalance ? tokenBalance.displayValue : null}
        />
      )}
      <p className="mb-4">
        Juke tokens are your passport to the world of music investment on our
        platform. They empower you to support and grow with the artists you
        love. Here&apos;s what you need to know:
      </p>
      <div className="mb-4 text-sm">
        <p>
          <strong>Simple and Transparent:</strong> Exchange your dollars for
          Juke tokens at a clear, consistent rate. No hidden fees or complicated
          processes.
        </p>
        <p>
          <strong>Support Artists Directly:</strong> Use Juke tokens to invest
          in music projects. Your contribution directly supports the
          artists&apos; creative endeavors.
        </p>
        <p>
          <strong>Participate in Success:</strong> As artists grow and succeed,
          your tokens can gain exclusive access to content, merchandise, or
          experiences.
        </p>
        <p>
          <strong>Easy to Use:</strong> Whether you&apos;re a seasoned investor
          or new to the scene, our platform makes it easy to get started with
          just a few clicks.
        </p>
      </div>
      <div className="mb-4">
        <div className="mt-1">
          <TokenInput amount={amount} onAmountChange={setAmount} />
        </div>
      </div>
      <Button
        onClick={handleBuyTokens}
        disabled={!isAmountValid(amount) || isMinting}
      >
        {isMinting ? "Processing..." : "Buy Juke Coins"}
      </Button>
    </div>
  );
};

export default BuyJukeContent;
