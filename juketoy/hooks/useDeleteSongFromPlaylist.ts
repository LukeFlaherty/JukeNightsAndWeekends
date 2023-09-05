import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useDeleteFromPlaylist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();

  const deleteFromPlaylist = async (playlistSongId: string) => {
    setLoading(true);
    setError(null);

    // Delete the song from the playlist_songs table using the unique playlistSongId
    try {
      const { error } = await supabaseClient
        .from("playlist_songs")
        .delete()
        .eq("id", playlistSongId); // Ensure this is the correct column name

      if (error) {
        throw error;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error Occured Deleting Item from Playlist");
      }
    } finally {
      setLoading(false);
    }
  };

  return { deleteFromPlaylist, loading, error };
};

export default useDeleteFromPlaylist;
