import { ArtistDetails, UserDetails } from "@/types";

import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  artistDetails: ArtistDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  // supabase user
  const user = useSupaUser();

  // token
  const accessToken = session?.access_token ?? null;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [artistDetails, setArtistDetails] = useState<ArtistDetails | null>(
    null
  );

  // Local getUserDetails function
  const fetchUserDetails = async (userId: string) => {
    setIsLoadingData(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Failed to fetch user details:", error);
        return null;
      }

      setUserDetails(data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchArtistDetails = async (userId: string) => {
    setIsLoadingData(true);
    try {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("artist_id", userId)
        .single();

      if (error) {
        console.error("Failed to fetch artist details:", error);
        return null;
      }

      setArtistDetails(data);
    } catch (error) {
      console.error("Failed to fetch artist details:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserDetails(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (user?.id && userDetails?.is_artist) {
      fetchArtistDetails(user.id);
    }
  }, [user, userDetails]);

  const value = {
    accessToken,
    user,
    userDetails,
    artistDetails,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
