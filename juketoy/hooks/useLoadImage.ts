import { Playlist, Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (data: Song | Playlist) => {
  const supabaseClient = useSupabaseClient();

  if (!data) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(data.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
