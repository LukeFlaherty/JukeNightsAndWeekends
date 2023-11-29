"use client";
import Modal from "@/components/Modal";
import useAuthModal from "@/hooks/useAuthModal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import useSyncEmail from "@/hooks/useSyncEmail";
import { useEffect } from "react";
import { ConnectWallet, embeddedWallet, useAddress } from "@thirdweb-dev/react";
import useSyncUserFromWalletLogin from "@/hooks/useSyncUserFromWalletLogin";

const AuthModal = () => {
  const address = useAddress();

  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen, actionType } = useAuthModal();

  // Use the custom hook for email synchronization
  // set for signups rn, can be set for logins as well
  const { loading, error } = useSyncEmail(session, actionType);
  const { loading: syncWalletLoading, error: syncWalletError } =
    useSyncUserFromWalletLogin();

  const modalTitle =
    actionType === "login" ? "Welcome back" : "Create a new account";
  const modalDescription =
    actionType === "login"
      ? "Log In to your account"
      : "Sign Up for a new account";

  // for wallet integration:
  const embeddedWalletConfig = embeddedWallet({
    styles: {
      borderRadius: "10px",
      colorBackground: "232323",
      colorPrimary: "lightseagreen",
      colorText: "#FFFFFF",
    },
  });

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  // Handle any loading or error states as needed
  // For example, you can display a loading indicator or an error message

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title={modalTitle}
      description={modalDescription}
      isOpen={isOpen}
      onChange={onChange}
    >
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* <Auth
        theme="dark"
        magicLink
        providers={["github", "google"]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#3D3D80",
                brandAccent: "#3D3D80",
              },
            },
          },
        }}
      /> */}
      <ConnectWallet />
    </Modal>
  );
};

export default AuthModal;
