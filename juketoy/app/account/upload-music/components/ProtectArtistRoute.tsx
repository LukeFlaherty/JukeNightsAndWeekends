"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface ProtectArtistRouteProps {
  children: ReactNode;
}

const ProtectArtistRoute: React.FC<ProtectArtistRouteProps> = ({
  children,
}) => {
  const { user, userDetails } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user || userDetails?.artist_approval_status !== "approved") {
      router.push("/account");
    }
  }, [user, router]);

  // If the user is not defined yet, we can return null or some loading state.
  // This prevents flashing of content.
  if (!user) return null;

  return <>{children}</>;
};

export default ProtectArtistRoute;
