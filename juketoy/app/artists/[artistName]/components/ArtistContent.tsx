"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface ArtistContentProps {
  songs: Song[];
}

const SHOW_DUPLICATES = true; // Toggle this to show/hide duplicate songs

const ArtistContent: React.FC<ArtistContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  let displaySongs = songs;

  if (!SHOW_DUPLICATES) {
    const seenSongs = new Set();
    displaySongs = songs.filter((song) => {
      const duplicate = seenSongs.has(song.id);
      seenSongs.add(song.id);
      return !duplicate;
    });
  }

  if (displaySongs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs by this artist.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {displaySongs.map((song, index) => (
        <div
          key={`${song.id}-${index}`}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              data={song}
              onDelete={() => {}}
              playlists={[]}
            />
          </div>
          <LikeButton songId={song.id} />
          {/* Remove the DeleteButton for artists as it doesn't make sense in this context */}
        </div>
      ))}
    </div>
  );
};

export default ArtistContent;
