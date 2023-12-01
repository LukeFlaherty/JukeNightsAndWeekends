"use client";
// components/TokenPurchaseInput.tsx
import React from "react";

interface TokenInputProps {
  amount: string;
  onAmountChange: (amount: string) => void;
}

const TokenInput: React.FC<TokenInputProps> = ({ amount, onAmountChange }) => {
  return (
    <div className="flex flex-col items-center my-8">
      <label
        htmlFor="amount"
        className="block text-lg font-semibold text-mainBrandColor mb-2 text-center"
      >
        Enter the amount of Juke tokens you want to purchase
      </label>
      <input
        type="number"
        id="amount"
        name="amount"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        placeholder="0"
        className="p-4 text-xl font-medium text-center text-mainBrandColor bg-white border-2 border-mainBrandColor rounded-lg shadow-lg focus:outline-none focus:border-mainBrandColorDark"
        min="1" // Set minimum token purchase amount as needed
      />
    </div>
  );
};

export default TokenInput;
