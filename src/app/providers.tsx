"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/Context/UserContext";
import { TeacherModeProvider } from "@/Context/TeacherModeContext";

type ProvidersProps = {
  children: React.ReactNode;
};

// Add custom types to window for Crisp
declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

// Crisp Integration Component
const CrispIntegration = () => {
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "e5a83a29-20e3-498c-8073-ee00d7c2b0cc";

    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);

  return null; // No UI render, just loads the Crisp script
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <UserProvider>
        <CrispIntegration />
        <TeacherModeProvider>{children}</TeacherModeProvider>
      </UserProvider>
    </SessionProvider>
  );
}
