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
import useSyncEmail from "@/hooks/useSyncEmail"; // Import the new hook
import { useEffect } from "react";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen, actionType } = useAuthModal();

  // Use the custom hook for email synchronization
  const { loading, error } = useSyncEmail(session, actionType);

  const modalTitle =
    actionType === "login" ? "Welcome back" : "Create a new account";
  const modalDescription =
    actionType === "login"
      ? "Log In to your account"
      : "Sign Up for a new account";

  // IS this working

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
      <Auth
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
      />
    </Modal>
  );
};

export default AuthModal;
