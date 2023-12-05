// JukeBalance.tsx
import React from "react";

interface JukeBalanceProps {
  balance: string | null;
}

const JukeBalance: React.FC<JukeBalanceProps> = ({ balance }) => {
  return (
    <div className="bg-mainBrandColor text-white p-4 my-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-center">Your Juke Token Balance</h3>
      <p className="text-3xl font-bold text-center">
        {balance !== null ? balance : "Loading..."}
      </p>
    </div>
  );
};

export default JukeBalance;
