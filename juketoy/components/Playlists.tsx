"use client";

import React, { useState } from "react";
import { Playlist } from "@/types";
import useAuthModal from "@/hooks/useAuthModal";
import useOnPlay from "@/hooks/useOnPlay";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import {
  TbPlaylist,
  TbPlaylistAdd,
  TbChevronDown,
  TbChevronUp,
} from "react-icons/tb";
import AddItem from "./SidebarAddItem";
import PlaylistItem from "./PlaylistItem";
import { useRouter } from "next/navigation";

interface PlaylistsProps {
  playlists: Playlist[];
}

const Playlists: React.FC<PlaylistsProps> = ({ playlists }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    // return uploadModal.onOpen();
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar open/close state
  };

  const handlePlaylistClick = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`);
  };

  return (
    <div className="flex flex-col pt-4">
      <div className="flex items-center justify-between px-5">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Playlists</p>
        </div>
        {/* Toggle between down and up chevron icons based on isSidebarOpen */}
        {isSidebarOpen ? (
          <TbChevronDown
            onClick={onClick}
            size={20}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        ) : (
          <TbChevronUp
            onClick={onClick}
            size={20}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        )}
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {/* Conditionally render the text only when the sidebar is open */}
        {isSidebarOpen && (
          <>
            <AddItem isPlaylist={true} />
            {/* Render your playlist content here */}
            {playlists.map((playlist) => (
              <div key={playlist.id} className="py-2">
                <PlaylistItem
                  playlist={playlist}
                  onClick={() => handlePlaylistClick(playlist.id)}
                  playlists={playlists}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Playlists;
