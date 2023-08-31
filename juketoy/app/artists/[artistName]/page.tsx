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
  const artistId = getArtistIdByName(params.artistName, artists);
  if (!artistId) {
    // Handle the error - maybe show a message or redirect the user
    return;
  }
  const artistDetails = await getArtistDetails(artistId);
  const artistSongs = await getArtistSongs(artistDetails!.artist_id);
  // const artistImageUrl = useLoadArtistImage(artistDetails!.profile_image_path);

  console.log("ARTIST DETAILS:", artistDetails);
  console.log("ARTIST SONGS:", artistSongs);
  console.log("ARTISTID From the action:", artistId);

  console.log("ARTISTS in the main page:", artists);
  console.log("ARTISTID from params:", params);

  // const artistDetails = artists.find(artist => artist.name === artistName);

  // console.log("WHATEVER THIS IS:", params.artistID);

  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <ArtistContent artist={artistDetails} songs={artistSongs || []} />
      </Header>
    </div>
  );
};

export default ArtistDetail;
