// // app/chat/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { getAllUsers } from "@/services/AuthServices";
// import { useAuth } from "@/components/hooks/useAuth";
// import ChatList from "@/components/ChatList/ChatList";

// interface User {
//   _id: string;
//   name: string;
// }

// export default function ChatPage() {
//   const { userId } = useAuth();
//   const [users, setUsers] = useState<User[]>([]);
//   useEffect(() => {
//     if (!userId) return;
//     getAllUsers().then((res) => {
//       if (res?.success && res.data?.users) setUsers(res.data.users);
//     });
//   }, [userId]);

//   if (!userId) return <div>Please login</div>;

//   return <ChatList users={users} />;
// }

"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/AuthServices";
import { useAuth } from "@/components/hooks/useAuth";
import ChatList from "@/components/ChatList/ChatList";

interface User {
  _id: string;
  name: string;
}

export default function ChatPage() {
  const { userId } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!userId) return;
    getAllUsers().then((res) => {
      if (res?.success && res.data?.users) {
        setUsers(res.data.users);
      }
    });
  }, [userId]);

  return <>{userId && <ChatList users={users} />}</>;
}
