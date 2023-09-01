import { UserDetails } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPendingArtists = async (): Promise<UserDetails[] | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // Querying users table to get all the users with 'pending' artist_approval_status.
  const { data: pendingArtistsData, error: pendingArtistsError } =
    await supabase
      .from("users")
      .select("*")
      .eq("artist_approval_status", "pending");

  if (pendingArtistsError || !pendingArtistsData) return null;

  return pendingArtistsData as UserDetails[];
};

export default getPendingArtists;
