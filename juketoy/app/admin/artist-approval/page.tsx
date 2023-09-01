import { UserDetails } from "@/types";
import ArtistApprovalTable from "./components/ArtistApprovalTable";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";

import getPendingArtists from "@/actions/getPendingArtists";

interface pageProps {
  artists: UserDetails[];
}

const ArtistApproval: React.FC<pageProps> = ({ artists }) => {
  const pendingArtists = getPendingArtists();
  console.log("pendingArtists", pendingArtists);

  const tempPendingArtists = [
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
    {
      id: "3",
      first_name: "Jack",
      last_name: "Doe",
      full_name: "Jack Doe",
      avatar_url: "https://i.pravatar.cc/300",
      is_artist: true,
      artist_approval_status: "accepted",
    },
    {
      id: "4",
      first_name: "Osama",
      last_name: "Doe",
      full_name: "Osama Doe",
      avatar_url: "https://i.pravatar.cc/300",
      is_artist: true,
      artist_approval_status: "denied",
    },
    {
      id: "5",
      first_name: "Bill",
      last_name: "Doe",
      full_name: "Bill Doe",
      avatar_url: "https://i.pravatar.cc/300",
      is_artist: true,
      artist_approval_status: "pending",
    },
  ];

  const filteredPendingArtists = tempPendingArtists.filter(
    (artist) => artist.artist_approval_status === "pending"
  );

  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <h1 className="text-2xl font-bold mb-4">Artist Approval Dashboard</h1>
        {/* Pending artists table/list will be rendered here */}
        <ArtistApprovalTable artists={filteredPendingArtists} />
      </Header>
    </div>
  );
};

export default ArtistApproval;
