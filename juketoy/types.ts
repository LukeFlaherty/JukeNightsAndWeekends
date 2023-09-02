import { type } from "os";
import Stripe from "stripe";

export interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

export interface Artist {
  created_at: string;
  artist_upload_id: string;
  artist_id: string;
  name: string;
  bio: string;
  profile_image_path: string;
  songs: Song[];
}

export interface Playlist {
  id: string;
  title: string;
  author: string;
  description: string;
  image_path: string;
  songs: Song[];
}

export interface UserDetails {
  id: string;
  full_name?: string;
  avatar_url?: string;
  is_artist: boolean;
  artist_approval_status: string;
  is_admin?: boolean;
}

export interface ArtistDetails {
  id: string;
  name: string;
  bio: string;
  profile_image_path: string;
  artist_upload_id: string;
}
