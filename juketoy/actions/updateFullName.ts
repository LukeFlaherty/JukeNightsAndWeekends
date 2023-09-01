import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const updateFullName = async (userId: string, newFullName: string) => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("users") // Assuming your user table is named 'users'
    .update({ full_name: newFullName })
    .eq("id", userId);

  if (error) {
    console.log(error);
    throw error;
  }

  return (data as any) || [];
};

export default updateFullName;
