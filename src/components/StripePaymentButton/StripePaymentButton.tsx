/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@/components/Firebase/firebase.config";

interface Props {
  teacherId: string;
  teacherName: string;
  amount: number;
}

const BookTourButton = ({ teacherId, teacherName, amount }: Props) => {
  const [firebaseUser] = useAuthState(auth);
  const { data: session } = useSession();

  const handleBooking = async () => {
    const isLoggedIn = firebaseUser || session?.user;
    console.log(teacherId, teacherName, amount);
    if (!isLoggedIn) {
      toast.error("Please log in to book a tour.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/payments/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teacherId, teacherName, price: amount }),
        }
      );
      console.log(res);

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to start payment session.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <button
      onClick={handleBooking}
      className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white py-2 px-4 rounded-md hover:brightness-110 transition-all text-xl"
    >
      Book a Teacher 💳
    </button>
  );
};

export default BookTourButton;
