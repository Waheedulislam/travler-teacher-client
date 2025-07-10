"use client";

import { Button } from "../../button";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { Card } from "../../card";
import Link from "next/link";
import { FaCity } from "react-icons/fa";

const NMDateComponents = () => {
  return (
    <div>
      <Card className="mx-auto rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-white/40 w-full max-w-4xl">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-6 p-6">
          {/* Location */}
          <div className="flex items-center gap-2 min-w-[150px] flex-1 group transition">
            <div className="border border-[#1E93A6] rounded-xl p-3 flex items-center justify-center group-hover:bg-[#1E93A6] transition">
              <FaLocationDot className="text-[#1E93A6] group-hover:text-white h-5 w-5 transition" />
            </div>
            <div>
              <Link
                href="/date-booking"
                className="flex flex-col text-base group"
              >
                <span className="text-muted-foreground group-hover:text-[#1E93A6] transition">
                  Country
                </span>
                <span className="font-medium text-[#FF8926] group-hover:underline">
                  Sen Martin
                </span>
              </Link>
            </div>
          </div>

          {/* City */}
          <div className="flex items-center gap-2 min-w-[150px] flex-1 group transition">
            <div className="border border-[#1E93A6] rounded-xl p-3 flex items-center justify-center group-hover:bg-[#1E93A6] transition">
              <FaCity className="text-[#1E93A6] group-hover:text-white h-5 w-5 transition" />
            </div>
            <Link
              href="/date-booking"
              className="flex flex-col text-base group"
            >
              <span className="text-muted-foreground group-hover:text-[#1E93A6] transition">
                City
              </span>
              <span className="font-medium text-[#FF8926] group-hover:underline">
                Worldwide
              </span>
            </Link>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 min-w-[150px] flex-1 group transition">
            <div className="border border-[#1E93A6] rounded-xl p-3 flex items-center justify-center group-hover:bg-[#1E93A6] transition">
              <BsCurrencyDollar className="text-[#1E93A6] group-hover:text-white h-5 w-5 transition" />
            </div>
            <Link
              href="/date-booking"
              className="flex flex-col text-base group"
            >
              <span className="text-muted-foreground group-hover:text-[#1E93A6] transition">
                Price
              </span>
              <span className="font-medium text-[#FF8926] group-hover:underline">
                $800 - $1000
              </span>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="w-full md:w-auto">
            <Link href="/teacher">
              <Button className="cursor-pointer w-full md:w-auto bg-gradient-to-r from-[#FF700B] to-[#FDC90C] text-white px-6 py-4 rounded-xl shadow-md hover:brightness-110 hover:scale-105 transition-all duration-200 font-semibold text-base">
                Find a Teacher
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NMDateComponents;
