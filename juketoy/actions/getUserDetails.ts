import { UserDetails } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getUserDetails = async (userID: string): Promise<UserDetails | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("users") // Assuming your user table is named "users"
    .select("*")
    .eq("id", userID) // Assuming the primary key column is named "id"
    .single();

  if (error || !data) return null;

  return data as UserDetails;
};

export default getUserDetails;
