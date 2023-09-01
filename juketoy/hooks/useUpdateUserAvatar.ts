import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useUpdateUserAvatar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();

  const updateUserAvatar = async (
    userId: string,
    newAvatarPublicUrl: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabaseClient
        .from("users")
        .update({ avatar_url: newAvatarPublicUrl })
        .eq("id", userId);

      if (error) {
        throw error;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateUserAvatar, loading, error };
};

export default useUpdateUserAvatar;
