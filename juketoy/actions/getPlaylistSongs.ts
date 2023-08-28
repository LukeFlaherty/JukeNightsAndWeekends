import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylistSongs = async (playlistId: string): Promise<Song[] | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: playlistSongsData, error: playlistSongsError } = await supabase
    .from("playlist_songs")
    .select("*")
    .eq("playlist_id", playlistId);

  if (playlistSongsError || !playlistSongsData) return null;

  const songPromises = playlistSongsData.map(async (playlistSongEntry) => {
    const { data: songData, error: songError } = await supabase
      .from("songs")
      .select("*")
      .eq("id", playlistSongEntry.song_id);

    if (songError || !songData) return null;
    return songData[0]; // Since each ID will correspond to a unique song, we take the first entry.
  });

  const songs = await Promise.all(songPromises);
  return songs.filter((song) => song !== null) as Song[];
};

export default getPlaylistSongs;
