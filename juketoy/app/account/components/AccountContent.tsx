"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import useUpdateUser from "@/hooks/useUpdateUser";
import Image from "next/image";
import useUploadAvatar from "@/hooks/useUploadAvatar";
import useUpdateUserAvatar from "@/hooks/useUpdateUserAvatar";
import useLoadUserImage from "@/hooks/useLoadUserImage";
import useUpdateArtist from "@/hooks/useUpdateArtist";
import Link from "next/link";
import Loading from "../loading";
import { useAddress } from "@thirdweb-dev/react";
import ManageMusicButton from "./ManageMusicButton";
import UploadMusicButton from "./UploadMusicButton";

const AccountContent = () => {
  const router = useRouter();
  const {
    isLoading,
    userDetails,
    artistDetails,
    fetchUserDetails,
    fetchArtistDetails,
  } = useUser();
  const { updateUser, loading: updating, error } = useUpdateUser();
  const {
    updateArtist,
    loading: artistUpdating,
    error: artistUpdateError,
  } = useUpdateArtist();

  const {
    updateUserAvatar,
    loading: avatarUpdateLoading,
    error: avatarUpdateError,
  } = useUpdateUserAvatar();

  const [editedFullName, setEditedFullName] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditingBio, setIsEditingBio] = useState(false);

  const [artistRequestSuccess, setArtistRequestSuccess] =
    useState<boolean>(false);
  const [artistRequestError, setArtistRequestError] = useState<string | null>(
    null
  );
  const [artistBio, setArtistBio] = useState<string>(""); // New state
  const [selectedArtistImage, setSelectedArtistImage] = useState<File | null>(
    null
  );

  const [artistName, setArtistName] = useState<string>(""); // New state for artist name
  const [isEditingName, setIsEditingName] = useState(false); // New state for toggling editing of the artist's name

  const [isIdHidden, setIsIdHidden] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  // for refreshing on updates
  const [refreshData, setRefreshData] = useState(false);

  const holdings = [
    {
      artist: "Taylor Swift",
      shares: 25,
    },
    {
      artist: "Ed Sheeran",
      shares: 10,
    },
    {
      artist: "Beyoncé",
      shares: 15,
    },
    {
      artist: "Billie Eilish",
      shares: 8,
    },
    {
      artist: "Ariana Grande",
      shares: 12,
    },
  ];

  // Initialize wallet address
  const address = useAddress();

  useEffect(() => {
    if (!isLoading && !userDetails) {
      router.replace("/");
    }

    if (userDetails?.full_name) {
      setEditedFullName(userDetails.full_name);
    }
  }, [isLoading, userDetails, router]);

  // initialize these when the component mounts
  useEffect(() => {
    if (artistDetails?.bio) {
      setArtistBio(artistDetails.bio);
    }
    if (artistDetails?.name) {
      // If there's an artist name in artistDetails, set it
      setArtistName(artistDetails.name);
    }
  }, [artistDetails]);

  const handleUpdateFullName = async () => {
    if (userDetails?.id && editedFullName !== null) {
      await updateUser(userDetails.id, { full_name: editedFullName });
      setIsEditing(false);
    }
    fetchUserDetails(userDetails?.id || "");
  };

  const { uploadAvatar } = useUploadAvatar();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const currentAvatarPublicUrl = useLoadUserImage({
    image_path: userDetails?.avatar_url || "",
  });

  const currentArtistImagePublicUrl = useLoadUserImage({
    image_path: artistDetails?.profile_image_path || "",
  });

  const handleAvatarChange = async () => {
    if (!selectedFile || !userDetails) return;

    // Upload the avatar and get its path
    const newAvatarUploadPath = await uploadAvatar(selectedFile);

    if (newAvatarUploadPath) {
      // Now, simply update the user's avatar URL in the database with the new path:
      await updateUser(userDetails.id, { avatar_url: newAvatarUploadPath });

      // Refresh the user details to reflect the change in UI.
      // You can use a function from the useUser hook or whichever method you employ to refetch user details.
      // TODO
      fetchUserDetails(userDetails.id);
    }
  };

  const handleArtistRequest = async () => {
    try {
      if (userDetails?.id) {
        await updateUser(userDetails.id, { artist_approval_status: "pending" });
        setArtistRequestSuccess(true);
      }
    } catch (err) {
      setArtistRequestError("Failed to submit request. Please try again.");
    }
    fetchArtistDetails(userDetails?.id || "");
  };

  const handleUpdateBio = async () => {
    if (userDetails?.id && artistBio) {
      await updateArtist(userDetails.id, { bio: artistBio });
      setIsEditingBio(false);
      // Handle artistUpdating and artistUpdateError if needed.
    }
    fetchUserDetails(userDetails?.id || "");
  };

  const handleUpdateName = async () => {
    if (userDetails?.id && artistName) {
      await updateArtist(userDetails.id, { name: artistName });
      setIsEditingName(false); // Reset the editing state for artist name
      // Handle any additional artist updating logic and error handling as needed.
    }
    fetchArtistDetails(userDetails?.id || "");
  };

  const handleCopyToClipboard = () => {
    if (navigator.clipboard && artistDetails?.artist_upload_id) {
      navigator.clipboard
        .writeText(artistDetails.artist_upload_id)
        .then(() => {
          setIsCopied(true);
          // Set a timer to remove the "Copied to clipboard" message after 2 seconds.
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => console.error("Failed to copy text: ", err));
    }
  };

  const handleArtistImageChange = async () => {
    if (!selectedArtistImage || !userDetails) return;

    const newArtistImageUploadPath = await uploadAvatar(selectedArtistImage); // Assuming you're using the same upload method

    if (newArtistImageUploadPath) {
      await updateArtist(userDetails.id, {
        profile_image_path: newArtistImageUploadPath,
      });

      // Refresh the artist details to reflect the change in UI.
      // TODO
      fetchArtistDetails(userDetails.id);
    }
  };

  // TODO: make it use the loading.tsx
  if (isLoading || updating || avatarUpdateLoading) {
    // added avatarUpdateLoading
    return <div className="mb-7 px-6">Loading...</div>;
    // return <Loading />;
  }
  // TODO: Replace buttons with the button component we have
  return (
    <div className="mb-10 px-8 py-5 bg-lightModeBackground rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-mainBrandColor">
        Your Account
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Full Name Section */}
        <div className="bg-hoverColor p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2 text-white">Full Name</h3>
          {isEditing ? (
            <div className="flex items-center">
              <input
                type="text"
                value={editedFullName || ""}
                onChange={(e) => setEditedFullName(e.target.value)}
                className="border p-2 rounded mr-2 text-white bg-gray-700"
              />
              <button
                onClick={handleUpdateFullName}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="text-mainBrandColor">
                {editedFullName || "Not Set"}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="ml-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Edit
              </button>
            </div>
          )}
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
        {/* Wallet Address Section */}
        <div className="bg-hoverColor p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2 text-white">
            Wallet Address
          </h3>
          <div className="flex items-center">
            <span className="text-mainBrandColor">
              {address || "Not Connected"}
            </span>
          </div>
        </div>

        {/* Investment Holdings Section */}
        <div className="bg-hoverColor p-4 rounded-lg col-span-2">
          <h3 className="font-medium text-lg mb-2 text-white">
            Investment Holdings
          </h3>
          <table className="w-full text-mainBrandColor mt-2 border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-600 text-left py-2">
                  Artist
                </th>
                <th className="border-b border-gray-600 text-right py-2">
                  Shares
                </th>
              </tr>
            </thead>
            <tbody>
              {holdings && holdings.length > 0 ? (
                holdings.map((holding) => (
                  <tr key={holding.artist}>
                    <td className="py-2">{holding.artist}</td>
                    <td className="text-right py-2">{holding.shares}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-2 italic">
                    No artist shares held.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Avatar Section */}
        <div className="bg-hoverColor p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2 text-white">Avatar</h3>

          <div className="flex items-center">
            {/* avatar image */}
            <Image
              src={currentAvatarPublicUrl || "/images/default_user.jpeg"}
              alt={userDetails?.full_name || "User"}
              width={64}
              height={64}
              className="rounded-full mr-2"
            />
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            />
            <button
              onClick={handleAvatarChange}
              className="ml-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Upload
            </button>
          </div>
          {avatarUpdateError && (
            <div className="text-red-500 mt-2">{avatarUpdateError}</div>
          )}
        </div>
        {/* Artist Section */}
        <div className="bg-hoverColor p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2 text-white">Artist</h3>
          {userDetails?.is_artist ? (
            <p>Yes</p>
          ) : (
            <div>
              <p>No</p>
              {userDetails?.artist_approval_status === "Pending" ? (
                <p>Your request is pending approval.</p>
              ) : (
                <>
                  <p>You can request to become an artist.</p>
                  <button
                    onClick={handleArtistRequest}
                    className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Request Artist Access
                  </button>
                </>
              )}
            </div>
          )}
          {artistRequestSuccess && (
            <div className="mt-4 text-green-500">
              Your request has been submitted!
            </div>
          )}
          {artistRequestError && (
            <div className="mt-4 text-red-500">{artistRequestError}</div>
          )}
        </div>
        {/* Approval Status Section */}
        <div className="bg-hoverColor p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2 text-white">
            Approval Status
          </h3>
          <p>{userDetails?.artist_approval_status || "Not Set"}</p>
        </div>
        {/* Admin Section */}
        <div className="bg-hoverColor p-4 rounded-lg">
          <h3 className="font-medium text-lg mb-2 text-white">Admin</h3>
          <p>{userDetails?.is_admin ? "Yes" : "No"}</p>
        </div>
        {/* Artist Bio Section */}
        {userDetails?.is_artist && (
          <div className="bg-hoverColor p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2 text-white">Artist Bio</h3>
            {isEditingBio ? (
              <div>
                <textarea
                  value={artistBio || ""}
                  onChange={(e) => setArtistBio(e.target.value)}
                  className="w-full border p-2 rounded mb-2 text-white"
                />
                <div className="flex mt-2">
                  <button
                    onClick={handleUpdateBio}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingBio(false)}
                    className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <span>{artistDetails?.bio || "Not Set"}</span>
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="ml-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>
              </div>
            )}
            {artistUpdateError && (
              <p className="text-red-500">{artistUpdateError}</p>
            )}
          </div>
        )}
        {/* Artist Name Section */}
        {userDetails?.is_artist && (
          <div className="bg-hoverColor p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2 text-white">Artist Name</h3>
            {isEditingName ? (
              <div>
                <input
                  type="text"
                  value={artistName || ""}
                  onChange={(e) => setArtistName(e.target.value)}
                  className="w-full border p-2 rounded mb-2 text-white"
                />
                <div className="flex mt-2">
                  <button
                    onClick={handleUpdateName} // We'll define this function in the next step.
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingName(false)}
                    className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <span>{artistDetails?.name || "Not Set"}</span>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="ml-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        )}
        {/* Artist Upload ID Section */}
        {userDetails?.is_artist && (
          <div className="bg-hoverColor p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2 text-white">
              Artist Upload ID
            </h3>
            <div className="flex items-center">
              <span>
                {isIdHidden ? "************" : artistDetails?.artist_upload_id}
              </span>
              <button
                onClick={() => setIsIdHidden(!isIdHidden)}
                className="ml-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                {isIdHidden ? "Reveal" : "Hide"}
              </button>
              {!isIdHidden && (
                <button
                  onClick={handleCopyToClipboard}
                  className="ml-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Copy
                </button>
              )}
            </div>
            {isCopied && (
              <span className="text-green-500">Copied to clipboard!</span>
            )}
          </div>
        )}
        {/* Artist Image Uploader */}
        {userDetails?.is_artist && (
          <div className="bg-hoverColor p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2 text-white">
              Artist Image
            </h3>
            <div className="flex items-center">
              <Image
                src={
                  currentArtistImagePublicUrl || "/images/default_artist.jpeg"
                } // Provide a default artist image if desired
                alt={artistDetails?.name || "Artist"}
                width={64}
                height={64}
                className="rounded-full mr-2"
              />
              <input
                type="file"
                onChange={(e) =>
                  setSelectedArtistImage(e.target.files?.[0] || null)
                }
              />
              <button
                onClick={handleArtistImageChange}
                className="ml-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Upload
              </button>
            </div>
          </div>
        )}
        {/* Upload Music */}
        <UploadMusicButton
          showButton={userDetails?.artist_approval_status === "approved"}
        />

        {/* Manage Music Button */}
        <ManageMusicButton isArtist={userDetails?.is_artist || false} />
      </div>
    </div>
  );
};

export default AccountContent;
