import { FC } from "react";
// create new file for the artist detail page
import ArtistContent from "../[artistName]/components/ArtistContent";
import { Song } from "@/types";
import getArtistDetails from "@/actions/getArtistDetails";
import getArtistSongs from "@/actions/getArtistSongs";
import getAllArtists from "@/actions/getAllArtists";

const ArtistDetail = async () => {
  // const artistDetails = await getArtistDetails(params.artistID);
  // artist name, description, profile_image, uuid
  // const artistSongs = await getArtistSongs(params.artistID);
  // artistID: uuid, songId, title, duration, url, album, artist, albumImage
  const artists = (await getAllArtists()) || [];

  // console.log("WHATEVER THIS IS:", params.artistID);

  return (
    <div className="bg-lightModeBackground rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <h1 className="text-mainBrandColor text-3xl font-semibold">
        Songs by {artists[2].name}
      </h1>
      {/* <ArtistContent songs={artistSongs || []} /> */}
    </div>
  );
};

export default ArtistDetail;
