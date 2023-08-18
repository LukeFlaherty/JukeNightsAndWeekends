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
      return authModal.onOpen();
    }

    // to block playing somgs to subscribed users, for signed in users or something in future?
    // if(!subscription) {
    //   return SubscribeModal.onOpen();
    // }

    // play song
    player.setId(id);
    // create "playlist" of next songs
    player.setIds(songs.map((song) => song.id));
  };
  return onPlay;
};

export default useOnPlay;
