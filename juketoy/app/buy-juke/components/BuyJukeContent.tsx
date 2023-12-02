"use client";

import React, { useState } from "react";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import TokenInput from "./TokenInput";

const BuyJukeContent: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const address = useAddress(); // Get the connected wallet address
  const router = useRouter();

  // Replace with your actual contract address
  const contractAddress = "0x875bd9Db81732Be0585f8808F0c56bDB074747c3";
  const { contract } = useContract(contractAddress);

  // Replace "mint" with the actual function name you want to call on your contract
  // If your function name is different, update accordingly
  const { mutateAsync: mintTokens, isLoading: isMinting } = useContractWrite(
    contract,
    "mint"
  );

  //   const handleBuyTokens = async () => {
  //     try {
  //       // Call the mint function of your smart contract
  //       const mintResult = await mintTokens({
  //         args: [address, amount] // Replace with actual arguments for your contract's function
  //       });
  //       console.info("Mint transaction successful", mintResult);
  //       alert(`Successfully purchased ${amount} Juke tokens!`);
  //     } catch (error) {
  //       console.error('Failed to purchase Juke tokens:', error);
  //       alert('Failed to purchase Juke tokens.');
  //     }
  //   };

  // Redirect function to the account page
  const redirectToAccount = () => {
    router.push("/account"); // Replace '/account' with the correct path if different
  };

  const handleAmountChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAmount(e.target.value);
  };

  const handleBuyTokens = async () => {
    // Implement the logic to handle the purchase of Juke tokens
    setIsProcessing(true);
    try {
      // TODO: Integrate with your payment or blockchain API
      console.log(`Purchasing ${amount} Juke tokens...`);
      // Call the mint function of your smart contract
      const mintResult = await mintTokens({
        args: [address, amount], // Replace with actual arguments for your contract's function
      });
      //   // Simulation of API call
      //   await new Promise((resolve) => setTimeout(resolve, 2000));
      //   alert(`Successfully purchased ${amount} Juke tokens!`);
      console.info("Mint transaction successful", mintResult);
      alert(`Successfully purchased ${amount} Juke tokens!`);
    } catch (error) {
      console.error("Failed to purchase Juke tokens:", error);
      alert("Failed to purchase Juke tokens.");
    } finally {
      setIsProcessing(false);
    }
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
          <TokenInput
            amount={amount}
            onAmountChange={(value: string) => setAmount(value)}
          />
        </div>
      </div>
      <button
        onClick={handleBuyTokens}
        disabled={!amount || isMinting}
        className="mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-mainBrandColor hover:bg-mainBrandColorDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBrandColor"
      >
        {isMinting ? "Processing..." : "Exchange for Tokens"}
      </button>
    </div>
  );
};

export default BuyJukeContent;
