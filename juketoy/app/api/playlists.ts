import type { NextApiRequest, NextApiResponse } from "next";
import getAllPlaylistsForUser from "@/actions/getAllPlaylistsForUserClient";
import getAllPlaylistsForUserClient from "@/actions/getAllPlaylistsForUserClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const playlists = await getAllPlaylistsForUserClient();
  res.status(200).json(playlists);
}
