"use client";

import { Playlist } from "@/types";
import MediaItem from "./MediaItem";
import useLoadImage from "@/hooks/useLoadImage";

interface PlaylistItemProps {
  playlist: Playlist;
  onClick?: (id: string) => void;
  playlists: Playlist[];
}

// needs both becuase this item sends us to the playlists dynamic page

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  playlist,
  onClick,
  playlists,
}) => {
  const { id, title, author, songs, image_path } = playlist;

  const imageUrl = useLoadImage(playlist);

  // const handleClick = () => {
  //   if (onClick) {
  //     onClick(id);
  //   }
  // };

  return (
    <MediaItem
      onClick={onClick}
      data={playlist}
      onDelete={() => {}}
      playlists={playlists}
    />
  );
};

export default PlaylistItem;
