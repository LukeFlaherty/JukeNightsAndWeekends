"use client";

import { TbPlaylistAdd } from "react-icons/tb";
import useCreatePlaylistModal from "@/hooks/useCreatePlaylistModal";
import useUploadModal from "@/hooks/useUploadModal";
import { AiOutlinePlus } from "react-icons/ai";

interface AddItemProps {
  isPlaylist: boolean; // Determines if it's for adding a playlist
}

const AddItem: React.FC<AddItemProps> = ({ isPlaylist }) => {
  const createPlaylistModal = useCreatePlaylistModal();
  const uploadModal = useUploadModal();

  const handleClick = () => {
    if (isPlaylist) {
      createPlaylistModal.onOpen(); // Open the CreatePlaylistModal
    } else {
      uploadModal.onOpen(); // Open the UploadModal
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer bg-lightItemColor hover:bg-hoverColor w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        {isPlaylist ? (
          <TbPlaylistAdd size={40} className="text-mainBrandColor" />
        ) : (
          <AiOutlinePlus size={40} className="text-mainBrandColor" /> // Replace IconForSong with the appropriate icon for adding a song
        )}
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-mainBrandColor truncate">
          {isPlaylist ? "Add Playlist" : "Add Song"}{" "}
          {/* Update text accordingly */}
        </p>
        <p className="text-white text-sm truncate">
          {isPlaylist ? "Create a new playlist" : "Upload a new song"}{" "}
          {/* Update text accordingly */}
        </p>
      </div>
    </div>
  );
};

export default AddItem;
