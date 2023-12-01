"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/Button"; // Import your custom Button component

interface Props {
  showButton: boolean;
}

const BuyJukeCoinButton: React.FC<Props> = ({ showButton }) => {
  if (!showButton) {
    return null; // Don't render the button if showButton is false
  }

  return (
    <div className="mt-0 col-span-2">
      <Link href="/buy-juke">
        <Button className="w-full text-white" disabled={false}>
          Buy Juke Tokens!
        </Button>
      </Link>
    </div>
  );
};

export default BuyJukeCoinButton;
