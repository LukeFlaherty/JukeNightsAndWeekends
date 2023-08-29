"use client";

import { useUser } from "@/hooks/useUser";
import { Artist } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ArtistItem from "./ArtistItem";
import useAuthModal from "@/hooks/useAuthModal";

interface ArtistListContentProps {
  artists: Artist[];
}

const ArtistListContent: React.FC<ArtistListContentProps> = ({ artists }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const authModal = useAuthModal();

  console.log("ARTISTS HERE", artists);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
      return authModal.onOpen();
    }
  }, [isLoading, user, router]);

  if (artists.length === 0) {
    return (
      <div
        className="
            flex
            flex-col
            gap-y-2
            w-full px-6
            text-neutral-400
          "
      >
        No artists.
      </div>
    );
  }

  console.log("First ones name", artists[0].name);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {artists.map((artist) => (
        <ArtistItem
          artistName={artist.name}
          artistImagePath={artist.profile_image_path}
        />
      ))}
    </div>
  );
};

export default ArtistListContent;
