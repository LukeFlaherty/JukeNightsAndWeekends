"use client";

import React from "react";
import Modal from "./Modal";
import { Playlist } from "@/types";
import useGetPlaylistsByUserId from "@/hooks/useGetPlaylistsByUserId";

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
  return (
    <Modal
      isOpen={isOpen}
      onChange={(open) => {
        if (!open) onClose();
      }}
      title="Add to Playlist"
      description="Select a playlist to add the song to:"
    >
      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          onClick={() => onPlaylistSelected(playlist.id)}
          className="cursor-pointer hover:bg-gray-200 p-2 rounded" // Add your styles here
        >
          {playlist.title}
        </div>
      ))}
    </Modal>
  );
};

export default SelectPlaylistModal;
