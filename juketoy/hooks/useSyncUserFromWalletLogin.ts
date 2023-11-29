// hooks/useSyncUserFromWalletLogin.ts
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAddress } from "@thirdweb-dev/react";

const useSyncUserFromWalletLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();
  const address = useAddress();

  useEffect(() => {
    const syncWallet = async () => {
      if (address) {
        setLoading(true);
        try {
          // Check if a user with this wallet address already exists
          const { data, error: fetchError } = await supabaseClient
            .from("users")
            .select("*")
            .eq("email_wallet_address", address)
            .maybeSingle(); // maybeSingle will return null instead of throwing an error if no rows are found

          if (fetchError) {
            throw fetchError;
          }

          if (!data) {
            // No existing user found, insert a new record
            const { error: insertError } = await supabaseClient
              .from("users")
              .insert([{ email_wallet_address: address }]);

            if (insertError) {
              throw insertError;
            }
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

    syncWallet();
  }, [address, supabaseClient]);

  return { loading, error };
};

export default useSyncUserFromWalletLogin;
