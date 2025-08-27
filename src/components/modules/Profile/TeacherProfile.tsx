// components/modules/Profile/TeacherProfile.tsx
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import userLogo from "../../../../public/assets/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png";
import { IUser } from "@/types";

interface TeacherProfileProps {
  user: IUser;
}

export default function TeacherProfile({ user }: TeacherProfileProps) {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardContent className="p-6 flex flex-col items-center">
          <div className="w-28 h-28 mb-4 rounded-full overflow-hidden ring-4 ring-amber-300 shadow">
            <Image
              src={user.image || userLogo}
              alt={user.name}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">{user.name} (Teacher)</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <p className="text-gray-800 text-center">
            Welcome! You can manage your classes and connect with students here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
