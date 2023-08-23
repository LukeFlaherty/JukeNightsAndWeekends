import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Image from "next/image";

// You'll need a function to get the playlist based on its ID

const PlaylistPage = () => {
  const router = useRouter();
  // const { playlistId } = router.query;

  // if (!playlistId) return null; // This handles the case where the component renders before Next.js fills in the router query

  // const playlist = getPlaylistById(playlistId); // This should return the playlist details, including the songs and the cover image

  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      playlist
    </div>
  );
};

export default PlaylistPage;
