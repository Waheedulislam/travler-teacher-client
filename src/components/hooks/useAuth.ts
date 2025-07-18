/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface DecodedToken {
  userId: string;
  // তোমার টোকেন অনুযায়ী অন্য ফিল্ড যোগ করতে পারো
}

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setUserId(null);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserId(decoded.userId);
    } catch (err) {
      setUserId(null);
    } finally {
      setLoading(false); // ✅ Always set loading to false
    }
  }, []);

  return { userId, loading };
}
