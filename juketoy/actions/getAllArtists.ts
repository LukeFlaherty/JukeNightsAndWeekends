import { Artist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getAllArtists = async (): Promise<Artist[] | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // This will select all fields for each artist.
  const { data, error } = await supabase.from("artists").select("*");

  if (error || !data) return null;

  return data as Artist[]; // Cast the data to the Artist type.
};

export default getAllArtists;
