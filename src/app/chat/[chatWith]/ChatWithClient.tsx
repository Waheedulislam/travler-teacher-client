"use client";

import { useAuth } from "@/components/hooks/useAuth";
import { SocketProvider } from "@/Context/SocketContext";
import Chat from "@/components/Chat/Chat";

export default function ChatWithClient({ chatWith }: { chatWith: string }) {
  const { userId } = useAuth();

  if (!userId) return <div>Please login</div>;

  return (
    <SocketProvider userId={userId}>
      <Chat currentUserId={userId} receiverId={chatWith} />
    </SocketProvider>
  );
}
