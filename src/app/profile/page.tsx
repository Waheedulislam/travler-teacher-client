// app/profile/page.tsx
"use client";

import AdminProfile from "@/components/modules/Profile/AdminProfile";
import TeacherProfile from "@/components/modules/Profile/TeacherProfile";
import UserProfile from "@/components/modules/Profile/UserProfile";
import { useUser } from "@/Context/UserContext";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(user);
  if (!mounted || isLoading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!user) return null;

  if (user.role === "admin") {
    return <AdminProfile user={user} />;
  }

  if (user.role === "teacher") {
    return <TeacherProfile user={user} />;
  }

  return <UserProfile user={user} />;
}
