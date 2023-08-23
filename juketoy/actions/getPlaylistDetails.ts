import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylistDetails = async (
  playlistId: string
): Promise<Playlist | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  console.log("Fetching playlist with ID:", playlistId);

  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("id", playlistId)
    .single();

  if (error || !data) return null;

  return data as Playlist;
};

export default getPlaylistDetails;
