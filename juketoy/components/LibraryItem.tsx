"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryItemProps {
  song: Song;
}

const LibraryItem: React.FC<LibraryItemProps> = ({ song }) => {
  const onPlay = useOnPlay([song]);

  return (
    <MediaItem onClick={() => onPlay(song.id)} key={song.id} data={song} />
  );
};

export default LibraryItem;
