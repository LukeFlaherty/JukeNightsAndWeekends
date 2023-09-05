import { PlaylistSong, Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylistSongs = async (
  playlistId: string
): Promise<PlaylistSong[] | null> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: playlistSongsData, error: playlistSongsError } = await supabase
    .from("playlist_songs")
    .select("*")
    .eq("playlist_id", playlistId);

  if (playlistSongsError || !playlistSongsData) return null;

  const songPromises = playlistSongsData
    .map(async (playlistSongEntry) => {
      const { data: songData, error: songError } = await supabase
        .from("songs")
        .select("*")
        .eq("id", playlistSongEntry.song_id);

      if (songError || !songData || !songData[0]) return null;

      return {
        ...songData[0],
        playlist_song_id: playlistSongEntry.id,
      };
    })
    .filter(Boolean); // This ensures null values are filtered out at this step itself.

  const songs = await Promise.all(songPromises);
  return songs.filter((song) => song !== null) as PlaylistSong[];
};

export default getPlaylistSongs;
