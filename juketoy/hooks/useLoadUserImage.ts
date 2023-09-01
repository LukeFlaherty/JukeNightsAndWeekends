import { useSupabaseClient } from "@supabase/auth-helpers-react";

type UserAvatarData = { image_path: string };

const useLoadUserImage = (data: UserAvatarData) => {
  const supabaseClient = useSupabaseClient();

  if (!data) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(data.image_path);

  return imageData.publicUrl;
};

export default useLoadUserImage;
