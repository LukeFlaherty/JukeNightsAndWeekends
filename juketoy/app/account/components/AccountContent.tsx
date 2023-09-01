"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import useUpdateUser from "@/hooks/useUpdateUser";
import Image from "next/image";
import useUploadAvatar from "@/hooks/useUploadAvatar";
import useUpdateUserAvatar from "@/hooks/useUpdateUserAvatar";
import useLoadUserImage from "@/hooks/useLoadUserImage";

const AccountContent = () => {
  const router = useRouter();
  const { isLoading, userDetails } = useUser();
  const { updateUser, loading: updating, error } = useUpdateUser();
  const {
    updateUserAvatar,
    loading: avatarUpdateLoading,
    error: avatarUpdateError,
  } = useUpdateUserAvatar();

  const [editedFullName, setEditedFullName] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [artistRequestSuccess, setArtistRequestSuccess] =
    useState<boolean>(false);
  const [artistRequestError, setArtistRequestError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!isLoading && !userDetails) {
      router.replace("/");
    }

    if (userDetails?.full_name) {
      setEditedFullName(userDetails.full_name);
    }
  }, [isLoading, userDetails, router]);

  const handleUpdateFullName = async () => {
    if (userDetails?.id && editedFullName !== null) {
      await updateUser(userDetails.id, { full_name: editedFullName });
      setIsEditing(false);
    }
  };

  const { uploadAvatar } = useUploadAvatar();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const currentAvatarPublicUrl = useLoadUserImage({
    image_path: userDetails?.avatar_url || "",
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
  };

  // TODO: make it use the loading.tsx
  if (isLoading || updating || avatarUpdateLoading) {
    // added avatarUpdateLoading
    return <div className="mb-7 px-6">Loading...</div>;
  }

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
        <div>
          <h3 className="font-medium text-sm mb-1">Avatar:</h3>
          {/* TODO Changing avatar does not work - pls change */}
          <div className="flex items-center">
            <Image
              src={userDetails?.avatar_url || "/images/default_user.jpeg"}
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
      </div>
    </div>
  );
};

export default AccountContent;
