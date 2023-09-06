import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import getPlaylistsByUserId from "@/actions/getPlaylistsByUserId";

import { ThirdwebProvider } from "@/components/ThirdwebProvider"; // Import ThirdwebProvider from your components

import { Gnosis } from "@thirdweb-dev/chains";
import {
  metamaskWallet,
  coinbaseWallet,
  WalletConfig,
} from "@thirdweb-dev/react";
import type { MetaMaskWallet, CoinbaseWallet } from "@thirdweb-dev/wallets";
import Providers from "@/components/Providers";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Juke",
  description: "Listen To Music, Better.",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  const userPlaylists = await getPlaylistsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider playlists={userPlaylists} songs={userSongs} />
              <Sidebar songs={userSongs} playlists={userPlaylists}>
                {children}
              </Sidebar>
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </Providers>
      </body>
    </html>
  );
}
