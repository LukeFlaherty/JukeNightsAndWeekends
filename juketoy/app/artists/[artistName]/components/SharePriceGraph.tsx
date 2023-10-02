"use client";

import React from "react";
import { Line } from "react-chartjs-2";

interface SharePriceGraphProps {
  prices: number[];
  labels: string[];
}

const SharePriceGraph: React.FC<SharePriceGraphProps> = ({
  prices,
  labels,
}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Share Price",
        data: prices,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="mt-10">
      <h2 className="text-white text-2xl font-bold mb-4">Share Price</h2>
      <Line data={data} />
    </div>
  );
};

export default SharePriceGraph;
