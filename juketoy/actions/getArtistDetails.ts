// gets artist details given an artist id?
import { Artist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getArtistDetails = async (artistID: string): Promise<Artist | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("artists") // The table name "artists" in your database
    .select("*")
    .eq("artist_id", artistID)
    .single();

  if (error || !data) return null;

  return data as Artist;
};

export default getArtistDetails;
