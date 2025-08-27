"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useSession, signOut as signOutNextAuth } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit3,
  Check,
  X,
  Camera,
  Mail,
  Copy,
  ExternalLink,
  Settings,
  LogOut,
  Sparkles,
  Heart,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import auth from "@/components/Firebase/firebase.config";
import userLogo from "../../../public/assets/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [firebaseUser] = useAuthState(auth);
  const [signOutFirebase] = useSignOut(auth);

  const loading = status === "loading";
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Memoize user data
  const user = useMemo(() => {
    return (
      session?.user ||
      (firebaseUser
        ? {
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            image: firebaseUser.photoURL,
          }
        : null)
    );
  }, [session?.user, firebaseUser]);

  // Set user info
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
      setTempName(user.name);
    }
    if (user?.email) {
      setEmail(user.email);
      setTempEmail(user.email);
    }
  }, [user]);

  const handleSave = () => {
    setName(tempName);
    setEmail(tempEmail);
    setIsEditing(false);
    toast.success("✅ Profile updated");
  };

  const handleCancel = () => {
    setTempName(name);
    setTempEmail(email);
    setIsEditing(false);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast.success("📧 Email copied");
  };

  const handleLogout = async () => {
    await signOutFirebase();
    await signOutNextAuth({ redirect: false });
    router.push("/");
    toast.success("🚪 Logged out");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-pink-500/5 backdrop-blur-xl border-0 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-full mx-auto">
        <Card className="overflow-hidden border-0 shadow-2xl rounded-3xl">
          <div className="h-36 sm:h-40 md:h-48 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300  relative" />
          <CardContent className="relative -mt-20 sm:-mt-24 md:-mt-28 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-pink-500/5 backdrop-blur-xl border-0 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
            {loading || !user ? (
              <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 mt-4">
                {/* Left: avatar + skeleton text */}
                <div className="flex flex-col items-center w-full lg:w-1/3 gap-4 px-4">
                  <Skeleton className="w-28 h-28 sm:w-32 sm:h-32 rounded-full" />
                  <Skeleton className="w-36 h-6 rounded-md" />
                  <Skeleton className="w-full max-w-xs h-5 rounded-md" />
                </div>

                {/* Right: stats and buttons skeleton */}
                <div className="flex-1 space-y-6 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Skeleton className="h-20 rounded-xl" />
                    <Skeleton className="h-20 rounded-xl" />
                    <Skeleton className="h-20 rounded-xl" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Skeleton className="h-10 flex-1 rounded-md" />
                    <Skeleton className="h-10 flex-1 rounded-md" />
                    <Skeleton className="h-10 flex-1 rounded-md" />
                  </div>
                  <Skeleton className="h-24 w-full rounded-2xl mt-6" />
                </div>
              </div>
            ) : (
              <>
                {/* Top Right */}
                <div className="absolute top-6 right-6 flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-emerald-100 text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        className="rounded-full shadow bg-white"
                      >
                        <Settings className="w-5 h-5 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="rounded-xl shadow border"
                    >
                      <DropdownMenuItem onClick={() => setIsEditing(true)}>
                        <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={copyEmail}>
                        <Copy className="w-4 h-4 mr-2" /> Copy Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="w-4 h-4 mr-2" /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                  {/* Left Panel */}
                  <div className="flex flex-col items-center lg:w-1/3 gap-4">
                    <div
                      className="relative group cursor-pointer"
                      onClick={handleImageUpload}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <Avatar className="w-28 h-28 sm:w-32 sm:h-32 ring-4 ring-white shadow-xl overflow-hidden rounded-full">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <Image
                            src={userLogo}
                            alt="Fallback User"
                            width={128}
                            height={128}
                            className="w-full h-full object-cover rounded-full"
                          />
                        )}
                      </Avatar>
                      <div
                        className={`absolute inset-0 bg-black/40 rounded-full items-center justify-center transition-opacity duration-300 ${
                          isHovering
                            ? "flex opacity-100"
                            : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <Camera className="text-white w-6 h-6" />
                      </div>
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={() =>
                        toast.error("⚠️ Updating image not supported yet.")
                      }
                    />
                    {isEditing ? (
                      <div className="w-full max-w-sm space-y-4">
                        <Label>
                          Full Name
                          <Input
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                          />
                        </Label>
                        <Label>
                          Email
                          <Input value={tempEmail} disabled />
                        </Label>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={handleCancel}>
                            <X className="w-4 h-4 mr-1" /> Cancel
                          </Button>
                          <Button onClick={handleSave}>
                            <Check className="w-4 h-4 mr-1" /> Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-xl font-bold">{name}</h2>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{email}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right Panel */}
                  {!isEditing && (
                    <div className="flex-1 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                          {
                            label: "Projects",
                            value: "127",
                            color: "text-indigo-600",
                          },
                          {
                            label: "Followers",
                            value: "2.4k",
                            color: "text-purple-600",
                          },
                          {
                            label: "Stars",
                            value: "15.2k",
                            color: "text-pink-600",
                          },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="rounded-xl p-6 bg-white border shadow hover:shadow-lg"
                          >
                            <div
                              className={`text-3xl font-extrabold ${stat.color}`}
                            >
                              {stat.value}
                            </div>
                            <div className="text-sm text-gray-500 uppercase">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400"
                          onClick={() => setIsEditing(true)}
                        >
                          <Sparkles className="w-5 h-5 mr-2 " /> Edit Profile
                        </Button>
                        <Button
                          className="flex-1"
                          variant="outline"
                          onClick={copyEmail}
                        >
                          <Copy className="w-5 h-5 mr-2" /> Copy Email
                        </Button>
                        <Button className="flex-1" variant="outline">
                          <Heart className="w-5 h-5 mr-2 text-pink-600" />{" "}
                          Follow
                        </Button>
                      </div>

                      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-6 rounded-2xl shadow-md">
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center gap-2 text-gray-800 font-semibold">
                            <Star className="w-5 h-5 text-purple-500" />
                            Profile Completion
                          </div>
                          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                            85%
                          </span>
                        </div>
                        <div className="w-full h-4 bg-gray-200 rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 rounded-full"
                            style={{ width: "85%" }}
                          />
                        </div>
                        <p className="mt-3 text-sm text-gray-600">
                          Add bio and social links to unlock more features.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
