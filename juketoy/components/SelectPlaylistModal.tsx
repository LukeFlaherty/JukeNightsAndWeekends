"use client";

import React from "react";
import Modal from "./Modal";
import { Playlist } from "@/types";
import PlaylistItem from "./PlaylistItem"; // Import the PlaylistItem component
import { useRouter } from "next/navigation";
import useSelectPlaylistModal from "@/hooks/useSelectPlaylistModal";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";

interface SelectPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaylistSelected?: (playlistId: string) => void;
  playlists: Playlist[];
  songId: string;
}

const SelectPlaylistModal: React.FC<SelectPlaylistModalProps> = ({
  isOpen,
  onClose,
  onPlaylistSelected,
  playlists,
  songId,
}) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const user = useUser();

  // suppossed to add a song into the database
  const handlePlaylistClick = async (playlistId: string) => {
    console.log("Im here in handlePlaylistClick");
    console.log("playlistId:", playlistId);
    console.log("songId:", songId);
    const { error } = await supabaseClient.from("playlist_songs").insert({
      song_id: songId,
      playlist_id: playlistId,
    });

    if (error) {
      toast.error(error.message);
    } else {
      onClose();
      router.push(`/playlist/${playlistId}`);
      toast.success(`Added to playlist! ${playlistId}`);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Add to Playlist"
      description="Select a playlist to add the song to:"
    >
      {playlists.map((playlist) => (
        <div key={playlist.id} className="mb-4">
          <PlaylistItem
            playlist={playlist}
            onClick={handlePlaylistClick}
            playlists={playlists}
          />
        </div>
      ))}
    </Modal>
  );
};

export default SelectPlaylistModal;
