"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ArtistItemProps {
  artistName: string;
}

const ArtistItem: React.FC<ArtistItemProps> = ({ artistName }) => {
  const router = useRouter();

  const handleArtistClick = () => {
    router.push(`/artists/${artistName}`);
  };

  return (
    <div
      onClick={handleArtistClick}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-lightItemColor cursor-pointer hover:bg-hoverColor transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src="/path_to_default_artist_image.png" // This can be updated with dynamic paths for artist images
          fill
          alt={artistName}
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full text-mainBrandColor">
          {artistName}
        </p>
      </div>
    </div>
  );
};

export default ArtistItem;
