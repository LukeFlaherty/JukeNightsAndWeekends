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
import { useEffect } from "react";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen, actionType } = useAuthModal();

  const modalTitle =
    actionType === "login" ? "Welcome back" : "Create a new account";
  const modalDescription =
    actionType === "login"
      ? "Log In to your account"
      : "Sign Up for a new account";

  // Effect to handle user session changes
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  // Effect to synchronize email on signup
  // on user create or login, change actiontype to change
  useEffect(() => {
    async function syncEmailOnSignup() {
      if (session && actionType === "login") {
        const userEmail = session.user.email;
        try {
          const { error } = await supabaseClient
            .from("users")
            .update({ email_address: userEmail })
            .eq("id", session.user.id);

          if (error) {
            throw error;
          }
        } catch (err) {
          console.error("Failed to sync email:", err);
          // Handle or log the error appropriately
        }
      }
    }

    syncEmailOnSignup();
  }, [session, supabaseClient, actionType]);

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
