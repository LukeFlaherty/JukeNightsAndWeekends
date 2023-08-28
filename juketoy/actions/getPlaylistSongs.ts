import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylistSongs = async (playlistId: string): Promise<Song[] | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  console.log("Fetching songs for playlist with ID:", playlistId);

  const { data, error } = await supabase
    .from("playlist_songs")
    .select("*")
    .eq("playlist_id", playlistId);

  if (error || !data) return null;

  console.log("ERROR NEW: ", error);
  console.log("DATA NEW: ", data);

  // Fetch song details for each song id
  const songIds = data.map((item) => item.song_id);
  console.log("Fetching song details for song IDs:", songIds);

  const { data: songData, error: songError } = await supabase
    .from("songs")
    .select("*")
    .in("id", songIds);

  if (songError || !songData) return null;

  return songData as Song[];
};

export default getPlaylistSongs;
