"use client";

import { useState, useMemo, createContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

import { isAuthenticated } from "@/utils/auth";

interface UserProps {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext<any>({});

const AuthProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProps>();
  const signedInUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  const loadData = async () => {
    const user = await isAuthenticated();
    if (!user) {
      sessionStorage.setItem("previousPathName", pathname);
      push("/login");
      return;
    } else {
      setUser(user);
    }
  };

  useEffect(() => {
    loadData()
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.log("Error on auth provided:", error);
      });
  }, []);

  return (
    <>
      {!isLoading && user && (
        <AuthContext.Provider value={signedInUser}>
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export default AuthProvider;
