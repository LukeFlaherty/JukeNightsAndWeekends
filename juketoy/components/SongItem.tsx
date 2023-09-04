"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";
import { FaEllipsisV } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import useDeleteSong from "@/hooks/useDeleteSong";
import { toast } from "react-hot-toast";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  const { user } = useUser();
  const { deleteSong, error } = useDeleteSong();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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

  const handleDeleteSong = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    await deleteSong(data.id);
    if (error) {
      toast.error("Not Yours");
    } else {
      toast.success("Song Deleted");
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownVisible]);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-lightItemColor cursor-pointer hover:bg-hoverColor transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || "/images/liked.png"}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full text-mainBrandColor">
          {data.title}
        </p>
        <p className="text-white text-sm pb-4 w-full truncate">{data.author}</p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
      <div className="absolute top-5 right-5">
        <FaEllipsisV
          onClick={handleEllipsisClick}
          className="text-mainBrandColor cursor-pointer hover:text-white transform transition-transform duration-300 hover:scale-110"
        />
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10"
          >
            <div className="text-black cursor-pointer px-4 py-2 hover:bg-hoverColor hover:text-white">
              Add to Playlist
            </div>
            {user?.id === data.user_id && (
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
    </div>
  );
};

export default SongItem;
