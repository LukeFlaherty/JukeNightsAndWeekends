"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { Artist, Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import Header from "@/components/Header";
import useLoadArtistImage from "@/hooks/useLoadArtistImage";

interface ArtistContentProps {
  songs: Song[];
  artist: Artist | null;
}

// const SHOW_DUPLICATES = true; // Toggle this to show/hide duplicate songs

const ArtistContent: React.FC<ArtistContentProps> = ({ songs, artist }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  const artistImageUrl = useLoadArtistImage(artist!.profile_image_path);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  // let displaySongs = songs;

  // if (!SHOW_DUPLICATES) {
  //   const seenSongs = new Set();
  //   displaySongs = songs.filter((song) => {
  //     const duplicate = seenSongs.has(song.id);
  //     seenSongs.add(song.id);
  //     return !duplicate;
  //   });
  // }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {/* Artist details */}
      {artist && (
        <div className="mt-10">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                fill
                alt="Playlist"
                className="object-cover"
                src={artistImageUrl || "/images/default_artist.png"}
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm ">
                {artist.bio}
              </p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                {artist.name}
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Conditionally display songs or no songs message */}
      {songs.length === 0 ? (
        <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
          No songs by this artist.
        </div>
      ) : (
        songs.map((song, index) => (
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
