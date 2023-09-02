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

  // console.log("ARTIST DETAILS:", artistDetails);
  // console.log("ARTIST SONGS:", artistSongs);
  // console.log("ARTISTID From the action:", artistId);

  // console.log("ARTISTS in the main page:", artists);
  // console.log("ARTISTID from params:", params);

  // const artistDetails = artists.find(artist => artist.name === artistName);
  console.log(artistId);

  // console.log("WHATEVER THIS IS:", params.artistID);
  // console.log("ARTIST Songs:", artistSongs);
  //  right now we are getting from here on click of the song:
  // fetch.js:22     GET https://vqzzqvtwplmplopcljac.supabase.co/rest/v1/songs?select=*&id=eq.3 406

  // we need to get from the song storage and not the table, but the song_path is the same as it would be in the table
  // so maybe we can still look at how we do it elsewhere

  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <ArtistContent artist={artistDetails} songs={artistSongs || []} />
      </Header>
    </div>
  );
};

export default ArtistDetail;
