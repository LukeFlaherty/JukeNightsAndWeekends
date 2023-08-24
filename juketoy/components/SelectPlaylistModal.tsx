"use client";

import React from "react";
import Modal from "./Modal";
import { Playlist } from "@/types";
import PlaylistItem from "./PlaylistItem"; // Import the PlaylistItem component
import { useRouter } from "next/navigation";
import useSelectPlaylistModal from "@/hooks/useSelectPlaylistModal";

interface SelectPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaylistSelected: (playlistId: string) => void;
  playlists: Playlist[];
}

const SelectPlaylistModal: React.FC<SelectPlaylistModalProps> = ({
  isOpen,
  onClose,
  onPlaylistSelected,
  playlists,
}) => {
  const router = useRouter();

  const handlePlaylistClick = (playlistId: string) => {
    console.log("Im here in handlePlaylistClick");
    onClose();
    router.push(`/playlist/${playlistId}`);
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
