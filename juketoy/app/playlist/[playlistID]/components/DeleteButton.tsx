"use client";

import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useDeleteSongFromPlaylist from "@/hooks/useDeleteSongFromPlaylist";

interface DeleteButtonProps {
  playlistSongId: string;
  playlistId: string;
  songId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  playlistSongId,
  playlistId,
  songId,
}) => {
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();
  const { deleteFromPlaylist, error } = useDeleteSongFromPlaylist();

  const handleDelete = async () => {
    if (!user) {
      return authModal.onOpenLogin();
    }

    await deleteFromPlaylist(playlistSongId); // <-- using the hook's delete function

    if (error) {
      toast.error("Error deleting song from playlist!");
    } else {
      // toast.success(`Song ${playlistSongId} removed from playlist!`);
      toast.success(`Song removed from playlist, refresh to see!`);
      // Optional: Refresh the page or update the UI to reflect the deletion.
      // You can use any other approach to trigger an update in your UI.
      // For instance, if using a state manager or local state, you can filter out the deleted song from the list.
    }
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleDelete}
    >
      <AiOutlineDelete color="#3D3D80" size={25} />
    </button>
  );
};

export default DeleteButton;
