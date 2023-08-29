"use client";
import useLoadArtistImage from "@/hooks/useLoadArtistImage";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ArtistItemProps {
  artistName: string;
  artistImagePath: string;
}

const ArtistItem: React.FC<ArtistItemProps> = ({
  artistName,
  artistImagePath,
}) => {
  const router = useRouter();
  const artistImageUrl = useLoadArtistImage(artistImagePath);

  const handleArtistClick = () => {
    router.push(`/artists/${artistName}`);
  };

  console.log("ARTIST NAME", artistName);
  console.log("ARTIST IMAGE PATH", artistImagePath);

  return (
    <div
      onClick={handleArtistClick}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-lightItemColor cursor-pointer hover:bg-hoverColor transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={artistImageUrl || "public/images/liked.png"} // Use the local image if artistImageUrl is null
          fill
          alt={artistName}
        />
        {artistName}
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
