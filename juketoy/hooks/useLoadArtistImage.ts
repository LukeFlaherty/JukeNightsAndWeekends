import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadArtistImage = (artistImagePath: string | null) => {
  const supabaseClient = useSupabaseClient();

  // If there's no image path provided, return null.
  if (!artistImagePath) {
    return null;
  }

  // Fetch the public URL for the artist's profile image.
  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(artistImagePath);

  // Return the public URL.
  return imageData?.publicUrl;
};

export default useLoadArtistImage;
