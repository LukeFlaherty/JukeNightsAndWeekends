import { UserDetails } from "@/types";
import ArtistApprovalTable from "./components/ArtistApprovalTable";

import React, { useEffect, useState } from "react";
import UserProvider from "@/providers/UserProvider";
import Header from "@/components/Header";

interface pageProps {
  artists: UserDetails[];
}

const ArtistApproval: React.FC<pageProps> = ({ artists }) => {
  // const pendingArtists = getPendingArtists();

  // export interface UserDetails {
  //   id: string;
  //   first_name: string;
  //   last_name: string;
  //   full_name?: string;
  //   avatar_url?: string;
  //   is_artist: boolean;
  //   artist_approval_status: string;
  // }
  const pendingArtists = [
    {
      id: "1",
      first_name: "John",
      last_name: "Doe",
      full_name: "John Doe",
      avatar_url: "https://i.pravatar.cc/300",
      is_artist: true,
      artist_approval_status: "pending",
    },
    {
      id: "2",
      first_name: "Jane",
      last_name: "Doe",
      full_name: "Jane Doe",
      avatar_url: "https://i.pravatar.cc/300",
      is_artist: true,
      artist_approval_status: "pending",
    },
  ];

  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <h1 className="text-2xl font-bold mb-4">Artist Approval Dashboard</h1>
        {/* Pending artists table/list will be rendered here */}
        <ArtistApprovalTable artists={pendingArtists} />
      </Header>
    </div>
  );
};

export default ArtistApproval;
