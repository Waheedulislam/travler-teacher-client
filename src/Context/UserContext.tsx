"use client";

import { getCurrentUser } from "@/services/AuthServices";
import { IUser } from "@/types";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { useSession } from "next-auth/react";
import { setCookie } from "cookies-next";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserProviderValues | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();

  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleUser = async () => {
      try {
        if (session?.accessToken) {
          setCookie("accessToken", session.accessToken);
        }

        const user = await getCurrentUser();
        setUser(user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      handleUser();
    } else {
      setIsLoading(false);
      setUser(null);
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider");
  }

  return context;
};
