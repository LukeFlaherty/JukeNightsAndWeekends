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
import { useEffect, useState } from "react";
import { User as SupabaseUser } from "@supabase/auth-helpers-react";

export interface User extends SupabaseUser {
  is_artist: boolean;
  artist_approval_status: string; // Or use 'pending' | 'approved' | 'rejected' if you're certain about the values
}

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

  const [isArtist, setIsArtist] = useState(false);

  useEffect(() => {
    if (session) {
      const user = session.user as User;
      if (user.is_artist && user.artist_approval_status === "pending") {
        router.push("/pending-approval");
      } else {
        router.refresh();
      }
      onClose();
    }
  }, [session, router, onClose]);

  // New useEffect for handling custom fields update after registration
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && isArtist) {
          await supabaseClient
            .from("users")
            .update({
              is_artist: true,
              artist_approval_status: "pending",
            })
            .eq("id", session?.user.id);
        }
      }
    );

    // Cleanup the listener when the component unmounts
    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, [isArtist, supabaseClient]);

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
      {actionType === "signup" && (
        <>
          <div className="flex items-center my-3">
            <input
              type="checkbox"
              id="artistCheckbox"
              checked={isArtist}
              onChange={() => setIsArtist(!isArtist)}
              className="mr-2 h-5 w-5 border rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
            />
            <label
              htmlFor="artistCheckbox"
              className="text-md font-medium ml-3"
            >
              Register as an Artist
            </label>
          </div>

          <p className="text-sm text-center mb-5 text-gray-600">
            This will not activate your account until a member of our team
            approves you.
          </p>

          {isArtist && (
            <>
              {/* TODO: Make this save somewhere lol */}
              <input
                type="text"
                placeholder="Artist Name"
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <textarea
                placeholder="Brief Bio - You can change later"
                className="mt-2 p-2 w-full h-24 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              ></textarea>
            </>
          )}
        </>
      )}
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
