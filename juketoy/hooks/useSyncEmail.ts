// hooks/useSyncEmail.ts
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Session } from "@supabase/supabase-js";

const useSyncEmail = (session: Session | null, actionType: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const syncEmail = async () => {
      if (session && actionType === "login") {
        // Check for specific actionType
        setLoading(true);
        setError(null);
        try {
          const { error } = await supabaseClient
            .from("users")
            .update({ email_address: session.user.email })
            .eq("id", session.user.id);

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
      }
    };

    syncEmail();
  }, [session, supabaseClient, actionType]);

  return { loading, error };
};

export default useSyncEmail;
