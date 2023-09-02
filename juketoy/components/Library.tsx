"use client";

import React, { useState } from "react";
import { Playlist, Song } from "@/types";
import LibraryItem from "./LibraryItem";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { TbMenu2, TbChevronDown, TbChevronUp } from "react-icons/tb";
import { useUser } from "@/hooks/useUser";
import AddItem from "./SidebarAddItem";

import useDeleteSong from "@/hooks/useDeleteSong";

interface LibraryProps {
  initialSongs: Song[];
  playlists: Playlist[];
}

const Library: React.FC<LibraryProps> = ({ initialSongs, playlists }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const { deleteSong } = useDeleteSong();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [songs, setSongs] = useState<Song[]>(initialSongs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpenLogin();
    }
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar open/close state
  };

  const handleSongDeletion = async (songId: string) => {
    await deleteSong(songId); // This is your deletion function
    setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
  };

  // TODO: Implement logic here and drag down through componenets
  // const handleSongAddedToPlaylist = async (songId: string, playlistId: string) => {
  //   await addSongToPlaylist(songId, playlistId);
  // };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5">
        <div className="inline-flex items-center gap-x-2">
          <TbMenu2 className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
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
        {isSidebarOpen && (
          <>
            <AddItem isPlaylist={false} />
            {songs.map((song) => (
              <LibraryItem
                key={song.id}
                song={song}
                onDelete={handleSongDeletion}
                playlists={playlists}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Library;
