import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useUploadAvatar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();

  const uploadAvatar = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const uploadPath = `avatars/${file.name}`;
      const { error: uploadError } = await supabaseClient.storage
        .from("images")
        .upload(uploadPath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Return the upload path instead of public URL
      return uploadPath;
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

  return { uploadAvatar, loading, error };
};

export default useUploadAvatar;
