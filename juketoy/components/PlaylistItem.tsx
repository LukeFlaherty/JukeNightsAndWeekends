"use client";

import { Playlist } from "@/types";
import MediaItem from "./MediaItem";
import useLoadImage from "@/hooks/useLoadImage";

interface PlaylistItemProps {
  playlist: Playlist;
  onClick?: (id: string) => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist, onClick }) => {
  const { id, title, author, songs, image_path } = playlist;

  const imageUrl = useLoadImage(playlist);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return <MediaItem onClick={handleClick} data={playlist} />;
};

export default PlaylistItem;
