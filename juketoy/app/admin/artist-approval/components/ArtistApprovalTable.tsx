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

  console.log("1", artists);
  console.log("3", currentUser.userDetails);

  useEffect(() => {
    if (!isAdmin(currentUser.userDetails)) {
      // If the user isn't an admin, redirect them to the homepage or a 404 page.
      // router.push("/");
    }
  }, [currentUser]);

  return (
    <div>
      {isAdmin(currentUser.userDetails) ? (
        <>
          <table className="min-w-full table-auto shadow-md rounded-lg text-black">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Avatar</th>
                <th className="px-4 py-2">Approval Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist, index) => (
                <tr
                  key={artist.id}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="border px-4 py-2">{artist.full_name}</td>
                  <td className="border px-4 py-2">
                    <img
                      src={artist.avatar_url}
                      alt={artist.full_name}
                      className="h-12 w-12 rounded-full"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    {artist.artist_approval_status}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => console.log("Accept logic here")}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => console.log("Reject logic here")}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>You do not have the permissions to view this page.</p>
      )}
    </div>
  );
};

export default ArtistApprovalTable;
