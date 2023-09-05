import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadArtistImages = (artistImagePaths: (string | null)[]) => {
  const supabaseClient = useSupabaseClient();

  // For each image path, fetch the public URL.
  const imageUrls = artistImagePaths.map((path) => {
    if (!path) return null;

    const { data: imageData } = supabaseClient.storage
      .from("images")
      .getPublicUrl(path);

    return imageData?.publicUrl;
  });

  return imageUrls;
};

export default useLoadArtistImages;
