"use client";

import { Playlist, Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryItemProps {
  song: Song;
  onDelete: (songId: string) => void;
  playlists: Playlist[];
}

const LibraryItem: React.FC<LibraryItemProps> = ({
  song,
  onDelete,
  playlists,
}) => {
  const onPlay = useOnPlay([song]);

  return (
    <MediaItem
      onClick={() => onPlay(song.id)}
      key={song.id}
      data={song}
      onDelete={onDelete}
      playlists={playlists}
    />
  );
};

export default LibraryItem;
