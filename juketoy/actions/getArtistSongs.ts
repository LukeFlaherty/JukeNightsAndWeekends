// retuen all songs in an array that are tagged with an parameter artist id
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getArtistSongs = async (artistID: string): Promise<Song[] | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: artistSongsData, error: artistSongsError } = await supabase
    .from("artist_songs")
    .select("*")
    .eq("artist_id", artistID);

  if (artistSongsError || !artistSongsData) return null;

  // Since you've mentioned the artist_songs table contains all the necessary fields related to a song (like title, song_path, etc.),
  // I'm assuming you don't need another separate "songs" table lookup like in the getPlaylistSongs example.
  // Thus, the artist_songs table essentially has all the Song type properties.

  return artistSongsData as Song[];
};

export default getArtistSongs;
