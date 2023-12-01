"use client";

import { useAddress } from "@thirdweb-dev/react";
import React, { useState } from "react";

const BuyJukeContent = () => {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const address = useAddress(); // Get the connected wallet address

  if (!address) {
    // Display a message if no wallet is connected
    return (
      <div className="text-center p-6">
        <p>Please connect your wallet to purchase Juke tokens.</p>
        {/* You can also include the ConnectWallet button here if needed */}
      </div>
    );
  }

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
      // Simulation of API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Successfully purchased ${amount} Juke tokens!`);
    } catch (error) {
      console.error("Failed to purchase Juke tokens:", error);
      alert("Failed to purchase Juke tokens.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Buy Juke Tokens</h2>
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount to buy"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            min="1" // Set minimum token purchase amount as needed
          />
        </div>
      </div>
      <button
        onClick={handleBuyTokens}
        disabled={isProcessing}
        className={`mt-3 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-mainBrandColor hover:bg-mainBrandColorDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mainBrandColor ${
          isProcessing ? "opacity-50" : ""
        }`}
      >
        {isProcessing ? "Processing..." : "Buy Tokens"}
      </button>
    </div>
  );
};

export default BuyJukeContent;
