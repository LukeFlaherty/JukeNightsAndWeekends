import { Playlist } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetPlaylistsByUserId = (userId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[] | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!userId) {
      return;
    }

    setIsLoading(true);

    const fetchPlaylists = async () => {
      const { data, error } = await supabaseClient
        .from("playlists")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setPlaylists(data as Playlist[]);
      setIsLoading(false);
    };
    fetchPlaylists();
  }, [userId, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      playlists,
    }),
    [isLoading, playlists]
  );
};

export default useGetPlaylistsByUserId;
