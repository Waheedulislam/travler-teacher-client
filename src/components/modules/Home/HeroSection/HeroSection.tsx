"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import NMDateComponents from "@/components/ui/core/NMDateComponents/NMDateComponents";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://rezdy.com/wp-content/uploads/2018/11/Blog-Photos-86_11zon.jpg"
          alt="People learning languages and experiencing culture around the world"
          fill
          className="object-cover transition-opacity duration-500 opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white max-w-4xl mx-auto">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight drop-shadow-md">
              Book Live Lessons.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400">
                Explore Local Culture.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl my-8 sm:mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow">
              We Believe Teachers Are the World’s Best Tour Guides.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8">
              <Link href="teacher">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-500 hover:via-amber-600 hover:to-orange-600 text-white font-bold px-8 py-6 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  Find Your Teacher
                </Button>
              </Link>
              <Link href="">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold px-8 py-5 text-lg transition-all duration-300 transform hover:scale-105 bg-transparent backdrop-blur-sm shadow-lg"
                >
                  Become a Teacher
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
                <span>10,000+ Happy Students</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-lg shadow-amber-400/50"></div>
                <span>50+ Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-orange-400/50"></div>
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Date Component */}
        <div className="relative z-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <NMDateComponents />
          </div>
        </div>
      </div>
    </section>
  );
}
