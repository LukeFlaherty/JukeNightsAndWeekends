import { FC } from "react";
// create new file for the artist detail page
import ArtistContent from "../[artistName]/components/ArtistContent";
import { Song } from "@/types";
import getArtistDetails from "@/actions/getArtistDetails";
import getArtistSongs from "@/actions/getArtistSongs";
import getAllArtists from "@/actions/getAllArtists";
import getArtistIdByName from "@/actions/getArtistIdByName";

import Header from "@/components/Header";

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
        <div className="rounded-lg h-full w-full overflow-hidden overflow-y-auto">
          <h1 className="text-mainBrandColor text-3xl font-semibold">
            Songs by {artistDetails?.name}
          </h1>
        </div>
      </Header>
      <ArtistContent artist={artistDetails} songs={artistSongs || []} />
    </div>
  );
};

export default ArtistDetail;
