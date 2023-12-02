import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Sound } from "@/types";

const useGetDefaultSounds = () => {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const fetchSounds = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabaseClient
        .from("sounds")
        .select("*")
        .eq("is_default", true);

      if (error) {
        setError(error.message);
      } else {
        setSounds((data as Sound[]) || []);
      }

      setLoading(false);
    };

    fetchSounds();
  }, [supabaseClient]);

  return { sounds, loading, error };
};

export default useGetDefaultSounds;
