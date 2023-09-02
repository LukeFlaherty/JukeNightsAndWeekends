import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// Assuming ArtistDetails is a type representing details specific to the artists table.
// If not, you might have to create one.
type ArtistDetails = {
  bio: string;
  // ... any other fields from the artist table you might need in the future.
};

const useUpdateArtist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();

  const updateArtist = async (
    artistId: string,
    updates: Partial<ArtistDetails>
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabaseClient
        .from("artists")
        .update(updates)
        .eq("id", artistId);

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

  return { updateArtist, loading, error };
};

export default useUpdateArtist;
