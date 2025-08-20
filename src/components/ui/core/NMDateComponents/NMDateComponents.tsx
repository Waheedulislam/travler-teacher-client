"use client";

import { BsCurrencyDollar } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { useTeacherMode } from "@/Context/TeacherModeContext";
import { useUser } from "@/Context/UserContext";
import { Card } from "../../card";
import { Button } from "../../button";
import { toast } from "sonner";

const NMDateComponents = () => {
  const { isTeacherMode, setTeacherMode } = useTeacherMode();
  const { user } = useUser();

  const handleTeacherToggle = () => {
    if (!user?.email) {
      toast.error("Please login first to become a teacher or switch mode.");
      return;
    }
    setTeacherMode(!isTeacherMode);
  };

  return (
    <div className="w-full px-4">
      <Card className="mx-auto rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-white/40 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 p-6">
          {/* 🌍 Location */}
          <div className="flex items-center gap-4 flex-1 min-w-[180px] group transition-all">
            <div className="border border-[#1E93A6] rounded-xl p-3 group-hover:bg-[#1E93A6] transition">
              <FaLocationDot className="text-[#1E93A6] group-hover:text-white h-5 w-5 transition" />
            </div>
            <Link
              href="/date-booking"
              className="flex flex-col group text-base"
            >
              <span className="text-muted-foreground group-hover:text-[#1E93A6] transition">
                Country
              </span>
              <span className="font-semibold text-[#FF8926] group-hover:underline">
                Saint Martin
              </span>
            </Link>
          </div>

          {/* 💰 Price */}
          <div className="flex items-center gap-4 flex-1 min-w-[180px] group transition-all">
            <div className="border border-[#1E93A6] rounded-xl p-3 group-hover:bg-[#1E93A6] transition">
              <BsCurrencyDollar className="text-[#1E93A6] group-hover:text-white h-5 w-5 transition" />
            </div>
            <Link
              href="/date-booking"
              className="flex flex-col group text-base"
            >
              <span className="text-muted-foreground group-hover:text-[#1E93A6] transition">
                Price
              </span>
              <span className="font-semibold text-[#FF8926] group-hover:underline">
                $100 - $500
              </span>
            </Link>
          </div>

          {/* 🔍 CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <Link href="/teacher" className="w-full md:w-auto">
              <Button className="w-full md:w-auto bg-gradient-to-r from-[#FF700B] to-[#FDC90C] text-white px-6 py-4 rounded-xl shadow-md hover:brightness-110 hover:scale-105 transition-all duration-200 font-semibold text-base">
                Find a Teacher
              </Button>
            </Link>

            {/* Toggle Teacher Mode */}
            <Button
              onClick={handleTeacherToggle}
              variant="outline"
              className="w-full md:w-auto border-[#FF8926] text-[#FF8926] hover:bg-[#FF8926]/10 px-6 py-4 rounded-xl font-semibold text-base transition-all"
            >
              {isTeacherMode ? "Switch to Student" : "Become a Teacher"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NMDateComponents;
