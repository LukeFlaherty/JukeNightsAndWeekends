import getPlaylistDetails from "@/actions/getPlaylistDetails";
import { FC } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import useLoadImage from "@/hooks/useLoadImage";
import PlaylistContent from "./components/PlaylistContent";
import { get } from "http";
import getPlaylistSongs from "@/actions/getPlaylistSongs";

interface pageProps {
  params: { playlistID: string };
}

const playlistPage: FC<pageProps> = async ({ params }) => {
  const playlist = await getPlaylistDetails(params.playlistID);
  const playlistSongs = await getPlaylistSongs(params.playlistID); // New line
  console.log("playlist", playlist);
  // TODO : make image work using useLoadImage
  const imagePath = playlist?.image_path.startsWith("http")
    ? playlist.image_path
    : "/images/liked.png";
  // console.log("ERROR:", playlist?.image_path);
  console.log("got playlist songs", playlistSongs);
  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                fill
                alt="Playlist"
                className="object-cover"
                src={playlist ? imagePath : "/images/liked.png"}
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm ">
                {playlist ? playlist.description : "Description not found."}
              </p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                {playlist ? playlist.title : "Playlist not found"}
              </h1>
            </div>
          </div>
        </div>
      </Header>
      {/* <LikedContent songs={songs} /> */}
      <PlaylistContent songs={playlistSongs || []} />
    </div>
  );
};

export default playlistPage;
