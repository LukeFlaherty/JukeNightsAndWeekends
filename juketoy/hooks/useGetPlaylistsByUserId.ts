import { useState } from "react";
import { Playlist } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useGetPlaylistsByUserId = () => {
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();

  const fetchPlaylists = async (userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }

      if (data) {
        setPlaylists(data as Playlist[]);
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

  return { fetchPlaylists, playlists, loading, error };
};

export default useGetPlaylistsByUserId;
