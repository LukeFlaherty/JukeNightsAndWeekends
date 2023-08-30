"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Artist, Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface ArtistContentProps {
  songs: Song[];
  artist: Artist | null;
}

const SHOW_DUPLICATES = true; // Toggle this to show/hide duplicate songs

const ArtistContent: React.FC<ArtistContentProps> = ({ songs, artist }) => {
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

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {/* Artist details */}
      {artist && (
        <div className="mb-6 flex flex-col gap-y-2">
          <h2 className="text-xl font-semibold">{artist.name}</h2>
          <p className="text-sm text-gray-600">{artist.bio}</p>
          {artist.profile_image_path && (
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <img
                src={artist.profile_image_path}
                alt={`${artist.name} profile`}
                className="object-cover w-full h-full rounded-full"
              />
            </div>
          )}
        </div>
      )}

      {/* Conditionally display songs or no songs message */}
      {displaySongs.length === 0 ? (
        <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
          No songs by this artist.
        </div>
      ) : (
        displaySongs.map((song, index) => (
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
          </div>
        ))
      )}
    </div>
  );
};

export default ArtistContent;
