import { Song } from "@/types";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import usePlayer from "./usePlayer";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpenLogin();
    }

    console.log("onPlay", id);
    console.log("songs", songs);
    console.log("player", player);
    const songToPlay = songs.find((song) => song.id === id);
    console.log("SONG TO PLAY", songToPlay);
    if (songToPlay) {
      player.setActiveSong(songToPlay);
      player.setSongs(songs);
    }
  };
  return onPlay;
};

export default useOnPlay;
