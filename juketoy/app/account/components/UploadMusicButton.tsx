"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/Button"; // Import your custom Button component

interface Props {
  showButton: boolean;
}

const UploadMusicButton: React.FC<Props> = ({ showButton }) => {
  if (!showButton) {
    return null; // Don't render the button if showButton is false
  }

  return (
    <div className="mt-8 col-span-2">
      <Link href="/account/upload-music">
        <Button className="w-full text-white" disabled={false}>
          Upload Music as an Artist
        </Button>
      </Link>
    </div>
  );
};

export default UploadMusicButton;
