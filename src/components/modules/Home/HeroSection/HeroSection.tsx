"use client";

import Image from "next/image";
import bannerImage from "../../../../../public/assets/banner-image.png";
import NMDateComponents from "@/components/ui/core/NMDateComponents/NMDateComponents";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage}
          alt="Banner Image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Overlay Card sasdf */}
      <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
        <NMDateComponents />
      </div>
    </section>
  );
}
