import { FC } from "react";
import Image from "next/image";
// create new file for the artist detail page
import ArtistContent from "../[artistName]/components/ArtistContent";
import { Song } from "@/types";
import getArtistDetails from "@/actions/getArtistDetails";
import getArtistSongs from "@/actions/getArtistSongs";
import getAllArtists from "@/actions/getAllArtists";
import getArtistIdByName from "@/actions/getArtistIdByName";

import Header from "@/components/Header";
import useLoadArtistImage from "@/hooks/useLoadArtistImage";

interface pageProps {
  params: { artistName: string };
}

const ArtistDetail: FC<pageProps> = async ({ params }) => {
  const artists = (await getAllArtists()) || [];
  const decodedArtistName = decodeURIComponent(params.artistName);
  const artistId = getArtistIdByName(decodedArtistName, artists);
  if (!artistId) {
    return (
      <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <div className="p-4 bg-red-100 border-red-400 text-red-700">
          Artist not found, there has been an issue.
        </div>
      </div>
    );
  }
  const artistDetails = await getArtistDetails(artistId);
  const artistSongs = await getArtistSongs(artistDetails!.artist_id);
  // const artistImageUrl = useLoadArtistImage(artistDetails!.profile_image_path);

  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <ArtistContent artist={artistDetails} songs={artistSongs || []} />
      </Header>
    </div>
  );
};

export default ArtistDetail;
