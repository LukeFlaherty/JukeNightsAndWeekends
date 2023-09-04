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
  }
  // TODO: Replace buttons with the button component we have
  return (
    <div className="mb-7 px-6">
      <h2 className="text-xl font-semibold mb-4">Your Account</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-sm mb-1">Full Name:</h3>
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
              <span>{editedFullName || "Not Set"}</span>
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
        {/* avatar changing */}
        <div>
          <h3 className="font-medium text-sm mb-1">Avatar:</h3>
          {/* TODO Changing avatar does not work - pls change */}
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
        <div>
          <h3 className="font-medium text-sm mb-1">Artist:</h3>
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
        <div>
          <h3 className="font-medium text-sm mb-1">Approval Status:</h3>
          <p>{userDetails?.artist_approval_status || "Not Set"}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm mb-1">Admin:</h3>
          <p>{userDetails?.is_admin ? "Yes" : "No"}</p>
        </div>
        {userDetails?.is_artist && (
          <div>
            <h3 className="font-medium text-sm mb-1">Artist Bio:</h3>
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
        {/* artist name */}
        {userDetails?.is_artist && (
          <div>
            <h3 className="font-medium text-sm mb-1">Artist Name:</h3>
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
        {/* artist upload code */}
        {userDetails?.is_artist && (
          <div className="mt-4">
            <h3 className="font-medium text-sm mb-1">Artist Upload ID:</h3>
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
        {/* artist image uploader */}
        {userDetails?.is_artist && (
          <div>
            <h3 className="font-medium text-sm mb-1">Artist Image:</h3>
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
        {userDetails?.artist_approval_status === "approved" && (
          <div className="mt-8">
            <Link
              href="/account/upload-music"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload Music as an Artist
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountContent;
