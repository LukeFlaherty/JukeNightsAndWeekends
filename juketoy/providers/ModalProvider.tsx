"use client";

import AuthModal from "@/components/AuthModal";
import SubscribeModal from "@/components/SubscribeModal";
import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";
import { ProductWithPrice } from "@/types";
import CreatePlaylistModal from "@/components/CreatePlaylistModal";
import SelectPlaylistModal from "@/components/SelectPlaylistModal";
import { Playlist } from "@/types";
import useSelectPlaylistModal from "@/hooks/useSelectPlaylistModal";

interface ModalProviderProps {
  products: ProductWithPrice[];
  playlists: Playlist[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  products,
  playlists,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const selectPlaylistModal = useSelectPlaylistModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
      <CreatePlaylistModal />
      <SelectPlaylistModal
        playlists={playlists}
        isOpen={selectPlaylistModal.isOpen}
        onClose={() => selectPlaylistModal.onClose()}
        onPlaylistSelected={(playlistId) => {}}
      />
    </>
  );
};

export default ModalProvider;
