import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";
import { IUser } from "@/types";
import { getAllUsers } from "@/services/AuthServices";

export default async function UserTable() {
  const result = await getAllUsers();
  const users: IUser[] = result?.data || [];
  console.log(users);
  return (
    <Card className="mt-6 shadow-lg">
      <CardContent className="overflow-x-auto p-4">
        <ScrollArea className="w-full max-h-[70vh]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-300">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="p-3">
                    <Image
                      src={user.image || "/default-avatar.png"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover border border-gray-300"
                    />
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3 text-right">
                    <div>
                      <Button disabled size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
