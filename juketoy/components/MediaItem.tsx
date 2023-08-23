"use client";

import React from "react";
import Image from "next/image";
import { FaEllipsisV } from "react-icons/fa"; // Step 2: Import the ellipsis icon

import useLoadImage from "@/hooks/useLoadImage";
import { Playlist, Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
  data: Song | Playlist;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);

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
    // Your ellipsis click logic here
  };

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
      <FaEllipsisV
        onClick={handleEllipsisClick}
        className="text-mainBrandColor cursor-pointer hover:text-white transform transition-transform duration-300 hover:scale-110"
      />
      {/* Step 3: Add the ellipsis icon */}
    </div>
  );
};

export default MediaItem;
