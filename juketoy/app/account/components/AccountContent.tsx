"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { UserDetails } from "@/types";

import Image from "next/image";

const AccountContent = () => {
  const router = useRouter();
  const { isLoading, userDetails } = useUser();

  useEffect(() => {
    if (!isLoading && !userDetails) {
      router.replace("/");
    }
  }, [isLoading, userDetails, router]);

  if (isLoading) {
    return <div className="mb-7 px-6">Loading...</div>;
  }

  return (
    <div className="mb-7 px-6">
      <h2 className="text-xl font-semibold mb-4">Your Account</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-sm mb-1">Full Name:</h3>
          <p>{userDetails?.full_name || "Not Set"}</p>
        </div>
        <div>
          <h3 className="font-medium text-sm mb-1">Avatar:</h3>
          <Image
            src={userDetails?.avatar_url || "/images/default_user.jpeg"}
            alt={userDetails?.full_name || "User"}
            width={64} // Adjust as needed
            height={64} // Adjust as needed
            className="rounded-full"
          />
        </div>
        <div>
          <h3 className="font-medium text-sm mb-1">Artist:</h3>
          <p>{userDetails?.is_artist ? "Yes" : "No"}</p>
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
