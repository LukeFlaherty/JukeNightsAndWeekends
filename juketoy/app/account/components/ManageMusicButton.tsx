"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/Button"; // Import your custom Button component

interface Props {
  isArtist: boolean;
}

const ManageMusicButton: React.FC<Props> = ({ isArtist }) => {
  if (!isArtist) {
    return null; // Don't render the button if the user is not an artist
  }

  return (
    <div className="mt-8 col-span-2">
      <Link href="/account/manage-music">
        <Button
          className="w-full text-white"
          type="button"
          disabled={false} // You can adjust this based on your logic
        >
          Manage Music
        </Button>
      </Link>
    </div>
  );
};

export default ManageMusicButton;
