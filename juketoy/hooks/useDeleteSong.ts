import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useDeleteSong = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();

  const deleteSong = async (songId: string) => {
    setLoading(true);
    setError(null);

    console.log("SONG ID:", songId);
    try {
      const { error } = await supabaseClient
        .from("songs")
        .delete()
        .eq("id", songId);

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

  return { deleteSong, loading, error };
};

export default useDeleteSong;
