"use client";

import Header from "@/components/Header";
import { useUser } from "@/hooks/useUser";
import { UserDetails } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

import toast from "react-hot-toast";

import useUpdateUser from "@/hooks/useUpdateUser";

interface ArtistApprovalTableProps {
  artists: UserDetails[];
}

const ArtistApprovalTable: React.FC<ArtistApprovalTableProps> = ({
  artists,
}) => {
  const currentUser = useUser();

  const { updateUser, loading: updating, error } = useUpdateUser();

  function isAdmin(userDetails: UserDetails | null) {
    return userDetails?.is_admin ?? false;
  }

  const router = useRouter();

  const handleAccept = async (userId: string) => {
    if (!userId) return;

    try {
      await updateUser(userId, {
        artist_approval_status: "approved",
        is_artist: true,
      });
      toast.success("Artist approved!");
      // You might want to refetch or reload the data to reflect the change immediately.
    } catch (err) {
      toast.error("Error while accepting the artist.");
      console.error("Error while accepting the artist:", err);
    }
  };

  const handleReject = async (userId: string) => {
    if (!userId) return;

    try {
      await updateUser(userId, {
        artist_approval_status: "denied",
        is_artist: false,
      });
      toast.success("Artist rejected!");
      // You might want to refetch or reload the data to reflect the change immediately.
    } catch (err) {
      toast.error("Error while rejecting the artist.");
      console.error("Error while rejecting the artist:", err);
    }
  };

  console.log("1", artists);
  console.log("3", currentUser.userDetails);

  // You can uncomment this logic if you want to redirect non-admins
  // useEffect(() => {
  //   if (!isAdmin(currentUser.userDetails)) {
  //     router.push("/");
  //   }
  // }, [currentUser]);

  return (
    <div>
      {/* TODO: Use the error page */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
                      onClick={() => handleAccept(artist.id)}
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(artist.id)}
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
