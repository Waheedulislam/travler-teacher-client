// components/modules/Profile/AdminProfile.tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import userLogo from "../../../../public/assets/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png";
import { IUser } from "@/types";

interface AdminProfileProps {
  user: IUser;
}

export default function AdminProfile({ user }: AdminProfileProps) {
  return (
    <div className="max-w-3xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
      <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-8 flex flex-col items-center">
          <div className="w-32 h-32 mb-6 rounded-full overflow-hidden ring-8 ring-gradient-to-tr from-indigo-400 via-purple-500 to-pink-500 shadow-xl">
            <Image
              src={user.image || userLogo}
              alt={user.name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white text-center">
            {user.name} <span className="text-indigo-500">(Admin)</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-center">
            {user.email}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed max-w-md">
            You have full access to manage the platform. You can review, edit, and 
            control all content, users, and settings from the admin panel.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
              Manage Users
            </button>
            <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              Platform Settings
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
