"use client";

import { UserProvider } from "@/Context/UserContext";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
