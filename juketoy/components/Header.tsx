"use client";

import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
import { useMemo } from "react";

import { ConnectWallet } from "@thirdweb-dev/react";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const router = useRouter();
  const pathname = usePathname();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // shuts down playing songs on logout
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out");
    }
  };
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-mainBrandColor p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-mainBrandColor" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-mainBrandColor" size={35} />
          </button>
        </div>
        {/* mobile */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <HiHome className="text-mainBrandColor" size={20} />
          </button>
          <button
            onClick={() => router.push("/search")}
            className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
          >
            <BiSearch className="text-mainBrandColor" size={20} />
          </button>
        </div>
        <div className="flex gap-x-4 items-center">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div className="flex gap-x-4 items-center">
                <Button
                  onClick={authModal.onOpenSignup}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={authModal.onOpenLogin}
                  className="bg-white px-6 py-2"
                >
                  Log In
                </Button>
              </div>
              <ConnectWallet
                theme="light"
                btnTitle="Connect Wallet"
                className="bg-white px-6 py-2"
              />
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
