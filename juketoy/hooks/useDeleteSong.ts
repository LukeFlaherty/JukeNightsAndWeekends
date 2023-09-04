import { useState, useContext } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";

const useDeleteSong = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();
  const { user } = useUser(); // Assuming you have a UserContext or useUser hook to get the current user

  const deleteSong = async (songId: string) => {
    setLoading(true);
    setError(null);

    // Fetch the song first to verify the owner
    const { data: song, error: fetchError } = await supabaseClient
      .from("songs")
      .select("user_id")
      .eq("id", songId)
      .single();

    if (fetchError) {
      setError("Failed to verify song ownership.");
      setLoading(false);
      return;
    }

    if (song.user_id !== user!.id) {
      // If the user is not the owner of the song
      setError("Not Yours");
      toast.error("Not Yours");
      setLoading(false);
      return;
    }

    // Continue with deletion
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
