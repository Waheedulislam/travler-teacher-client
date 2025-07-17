"use client";

import { use } from "react";
import { useAuth } from "@/components/hooks/useAuth";
import { SocketProvider } from "@/Context/SocketContext";
import Chat from "@/components/Chat/Chat";
import { useSearchParams } from "next/navigation";

interface AsyncParams {
  chatWith: string;
}

interface Props {
  params: Promise<AsyncParams>; // ✅ update to match new async type
}

export default function ChatWithPage({ params }: Props) {
  const { chatWith } = use(params); // ✅ unwrap the Promise safely
  const { userId } = useAuth();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const image = searchParams.get("image") || "";

  if (!userId) return <div>Please login</div>;

  return (
    <SocketProvider userId={userId}>
      <Chat
        currentUserId={userId}
        receiverId={chatWith}
        receiverName={name}
        receiverImage={image}
      />
    </SocketProvider>
  );
}
