import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getUserDetails = async (userId: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data, error } = await supabase
    .from("users")
    .select("*") // You can modify this to fetch other fields too if needed
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Failed to fetch user details:", error);
    return null;
  }

  return data;
};
