"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa"; // Step 2: Import the ellipsis icon

import useLoadImage from "@/hooks/useLoadImage";
import { Playlist, Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import useDeleteSong from "@/hooks/useDeleteSong";
import { on } from "events";
import SelectPlaylistModal from "./SelectPlaylistModal";

import useSelectPlaylistModal from "@/hooks/useSelectPlaylistModal";

interface MediaItemProps {
  data: Song | Playlist;
  onClick?: (id: string) => void;
  onDelete: (songId: string) => void;
  playlists?: Playlist[];
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
  onDelete,
  playlists,
}) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);
  const { user } = useUser();
  const { deleteSong, error } = useDeleteSong();

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // const { isOpen, onOpen, onClose } = useSelectPlaylistModal();
  const selectPlaylistModal = useSelectPlaylistModal();

  // console.log("PLAYLISTS from MediaItem:", playlists);

  const isSong = "song_path" in data;

  // makes it play a song on the click of the media item
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    return player.setId(data.id);
  };

  const handleEllipsisClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setDropdownVisible(!isDropdownVisible); // Toggle dropdown visibility
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  // if you click delete song
  const handleDeleteSong = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation(); // <-- This will prevent the handleClick on the parent div

    await deleteSong(data.id);
    if (!error) {
      // Remove song from UI
      onDelete(data.id);
    } else {
      // Handle the error. Maybe show an error message to the user.
    }
  };

  // if you click add to playlist
  const handleAddToPlaylistClick = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    handleEllipsisClick(event);
    event.stopPropagation(); // <-- This will prevent the handleClick on the parent div
    selectPlaylistModal.onOpen(data.id);
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Cleanup on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer bg-lightItemColor hover:bg-hoverColor w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || "images/liked.png"}
          alt="Media item"
          className="object-cover"
        />
      </div>
      <div className="flex-grow flex flex-col gap-y-1 overflow-hidden">
        <p className="text-mainBrandColor truncate">{data.title}</p>
        <p className="text-white text-sm truncate">{data.author}</p>
      </div>
      {isSong && (
        <div className="relative">
          <FaEllipsisV
            onClick={handleEllipsisClick}
            className="text-mainBrandColor cursor-pointer hover:text-white transform transition-transform duration-300 hover:scale-110"
          />
          {isDropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10" // Style as needed
            >
              <div
                onClick={handleAddToPlaylistClick}
                className="text-black cursor-pointer px-4 py-2 hover:bg-hoverColor hover:text-white"
              >
                Add to Playlist
              </div>

              {playlists && (
                <SelectPlaylistModal
                  isOpen={selectPlaylistModal.isOpen}
                  onClose={selectPlaylistModal.onClose}
                  playlists={playlists}
                  songs={[data]}
                  songId={data.id}
                />
              )}

              {/* This render is only condiiontal on showing delete song if it is owned by the current user */}
              {/* but since it is in the library, than it is by default. */}
              {/* add a uploaderId, in the future if songs that dont belong to the user can end up in the library */}
              {user && (
                <div
                  onClick={handleDeleteSong}
                  className="text-black cursor-pointer px-4 py-2 hover:bg-hoverColor hover:text-white"
                >
                  Delete Song
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaItem;
