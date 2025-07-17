"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface DecodedToken {
  userId: string;
  // তোমার টোকেন অনুযায়ী অন্য ফিল্ড যোগ করতে পারো
}

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUserId(null);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserId(decoded.userId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setUserId(null);
    }
  }, []);

  return { userId };
}
