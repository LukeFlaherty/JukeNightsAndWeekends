"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryItemProps {
  song: Song;
  onDelete: (songId: string) => void;
}

const LibraryItem: React.FC<LibraryItemProps> = ({ song, onDelete }) => {
  const onPlay = useOnPlay([song]);

  return (
    <MediaItem
      onClick={() => onPlay(song.id)}
      key={song.id}
      data={song}
      onDelete={onDelete}
    />
  );
};

export default LibraryItem;
