import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { UserDetails } from "@/types";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();

  const updateUser = async (userId: string, updates: Partial<UserDetails>) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabaseClient
        .from("users")
        .update(updates)
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

  return { updateUser, loading, error };
};

export default useUpdateUser;
