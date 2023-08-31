"use client";

import Header from "@/components/Header";
import { useUser } from "@/hooks/useUser";
import { UserDetails } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ArtistApprovalTableProps {
  artists: UserDetails[];
}

const ArtistApprovalTable: React.FC<ArtistApprovalTableProps> = ({
  artists,
}) => {
  const [pendingArtists, setPendingArtists] = useState([]);
  const currentUser = useUser();

  function isAdmin(userDetails: UserDetails | null) {
    return userDetails?.is_admin ?? false;
  }
  const router = useRouter();

  console.log("1", currentUser);
  console.log("2", isAdmin(currentUser.userDetails));
  console.log("3", currentUser.userDetails);

  useEffect(() => {
    if (!isAdmin(currentUser.userDetails)) {
      // If the user isn't an admin, redirect them to the homepage or a 404 page.
      //   router.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    // We will fetch pending artists here soon
  }, []);
  return (
    <div>
      ArtistApprovalTable
      {isAdmin(currentUser.userDetails) && <button>Manage Artists</button>}
    </div>
  );
};

export default ArtistApprovalTable;
