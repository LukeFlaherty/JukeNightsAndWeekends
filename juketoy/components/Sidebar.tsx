"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { FaMusic } from "react-icons/fa"; // <-- Importing an icon for Artists, you can change this

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Playlist, Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
import Playlists from "./Playlists";
import { useRouter } from "next/navigation";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
  playlists: Playlist[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs, playlists }) => {
  const pathname = usePathname();
  const player = usePlayer();
  const router = useRouter();

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
      // Adding the Artists navigation link
      {
        icon: FaMusic,
        label: "Artists",
        active: pathname.startsWith("/artists"),
        href: "/artists",
      },
    ],
    [pathname]
  );

  const handlePlaylistClick = async (playlistId: string) => {
    router.push(`/playlists/${playlistId}`);
  };

  return (
    <div
      className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div className="hidden md:flex flex-col bg-lightModeBackground h-full w-[300px] p-2">
        <Box className="overflow-y-auto h-full bg-gradient-to-b from-mainBrandColor">
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
          <Library initialSongs={songs} playlists={playlists} />
          <Playlists playlists={playlists} />
        </Box>
      </div>
      <main className="bg-lightModeBackground h-full flex-1 overflow-y-auto py-2 ">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
