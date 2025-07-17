"use client";

import Link from "next/link";

interface User {
  _id: string;
  name: string;
}

interface ChatListProps {
  users: User[];
}

export default function ChatList({ users }: ChatListProps) {
  if (!users || users.length === 0) return <p>No users found</p>;

  return (
    <div className="max-w-md mx-auto">
      {users.map((user) => (
        <Link
          key={user._id}
          href={`/chat/${user._id}`}
          className="block p-4 border rounded mb-2 hover:bg-gray-100"
        >
          {user.name}
        </Link>
      ))}
    </div>
  );
}
