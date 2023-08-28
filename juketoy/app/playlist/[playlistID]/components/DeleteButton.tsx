"use client";

import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface DeleteButtonProps {
  playlistSongId: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ playlistSongId }) => {
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const handleDelete = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    const { error } = await supabaseClient
      .from("playlist_songs")
      .delete()
      .eq("song_id", playlistSongId)
      .single();

    if (error) {
      // toast.error(error.message);
      // TODO: Need to add user_id ot the playlist_songs table so that I can specify who can delete
      toast.error("Error deleting song from playlist! (Not Implemented Yet)");
    } else {
      toast.success("Song removed from playlist!");
      // Optional: Refresh the page or update the UI to reflect the deletion
      // You can use any other approach to trigger an update in your UI
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
