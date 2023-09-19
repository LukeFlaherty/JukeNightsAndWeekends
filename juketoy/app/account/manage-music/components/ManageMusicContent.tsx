"use client";
import { FC } from "react";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import useLoadArtistImage from "@/hooks/useLoadArtistImage";

const ManageMusicContent = () => {
  const router = useRouter();
  const {
    isLoading,
    userDetails,
    artistDetails,
    fetchUserDetails,
    fetchArtistDetails,
  } = useUser();

  const currentAvatarPublicUrl = useLoadArtistImage(
    artistDetails?.profile_image_path || ""
  );

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      <span>
        <strong>Artist:</strong> {artistDetails!.name}
      </span>
      {/* Artist details */}
      <div className="mt-10">
        <div className="flex flex-col md:flex-row items-center gap-x-5">
          <div className="relative h-32 w-32 lg:h-44 lg:w-44 rounded-md overflow-hidden">
            <img
              className="object-cover h-full w-full"
              src={currentAvatarPublicUrl || "/images/default_artist.png"}
              alt="Artist Image"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-1">
              <h1 className="text-3xl font-semibold">Manage Music</h1>
              <p className="text-sm">
                This is a platform for talented artists like you. Use the form
                below to upload your music. We support MP3 format for songs and
                any common image format for the cover image.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Songs */}
    </div>
  );
};

export default ManageMusicContent;
