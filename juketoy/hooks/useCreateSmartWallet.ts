// hooks/useCreateSmartWallet.ts
import { useState, useEffect } from "react";
import {
  useConnect,
  metamaskWallet,
  smartWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import { Session } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ACCOUNT_FACTORY_ADDRESS } from "@/constants/addresses";

const useCreateSmartWallet = (
  session: Session | null,
  email: string,
  actionType: string
) => {
  const connect = useConnect();
  const supabaseClient = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // for wallet integration:
  const embeddedWalletConfig = embeddedWallet({
    styles: {
      borderRadius: "10px",
      colorBackground: "232323",
      colorPrimary: "lightseagreen",
      colorText: "#FFFFFF",
    },
  });

  const smartWalletConfig = smartWallet(embeddedWalletConfig, {
    factoryAddress: ACCOUNT_FACTORY_ADDRESS,
    gasless: true,
  });

  useEffect(() => {
    const createWallet = async () => {
      if (actionType === "signup" && session && email) {
        console.log("Creating wallet...");
        setLoading(true);
        try {
          // Create personal wallet
          const personalWallet = await connect(embeddedWalletConfig, {
            chainId: 80001,
            loginType: "ui_email_otp",
            email: email,
          });
          const personalWalletAddress = await personalWallet.getAddress();

          // Create smart wallet
          const smartWallet = await connect(smartWalletConfig, {
            personalWallet: personalWallet,
            chainId: 80001,
          });
          const smartWalletAddress = await smartWallet.getAddress();
          console.log("smartWalletAddress:", smartWalletAddress);

          // Update user record with the smart wallet address
          const { error: updateError } = await supabaseClient
            .from("users")
            .update({ wallet_address: smartWalletAddress })
            .eq("email", email);

          if (updateError) throw updateError;
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

    createWallet();
  }, [session, email, actionType, connect, supabaseClient]);

  return { loading, error };
};

export default useCreateSmartWallet;
