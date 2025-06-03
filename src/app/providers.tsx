"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/Context/UserContext";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <UserProvider>{children}</UserProvider>
    </SessionProvider>
  );
}
