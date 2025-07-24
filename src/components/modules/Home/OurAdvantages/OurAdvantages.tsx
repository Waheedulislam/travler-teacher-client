"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

const OurAdvantages = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    AOS.init({ once: true });
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent SSR mismatch

  return (
    <Container>
      <div
        data-aos="fade-up"
        data-aos-duration="1400"
        data-aos-easing="ease-in-out"
      >
        <Title title="Our Advantages" />
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-easing="ease-in-out"
      >
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6">
          Why Travel to Your Teacher?
        </h1>
      </div>
      <section className="py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 300}
              data-aos-duration="1400"
              data-aos-easing="ease-in-out"
            >
              <Card
                className={cn(
                  "rounded-2xl shadow-md transition-all duration-300 group flex flex-col",
                  idx === 0 || idx === 2 ? "min-h-[380px]" : "min-h-[320px]",
                  item.bg,
                  idx !== 1 && "hover:bg-white"
                )}
              >
                <CardContent className="flex flex-col items-center text-center p-6 space-y-4 flex-grow justify-between">
                  <Image
                    src={item.image}
                    height={80}
                    width={80}
                    alt={item.title}
                    className="my-10"
                  />
                  <h3
                    className={cn(
                      "font-semibold text-2xl transition-colors duration-300",
                      idx === 1
                        ? "text-orange-600"
                        : "text-white group-hover:text-orange-600"
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="text-lg font-normal text-[#5E6282] break-words">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

const advantages = [
  {
    title: "📡 Knowledge & Experience",
    description:
      "Teachers bring deep knowledge and years of educational experience.",
    image: "/assets/group-image/Group 48.png",
    bg: "bg-yellow-300",
  },
  {
    title: "📖 History Comes Alive",
    description:
      "Discover the stories behind the places you visit — guided by local experts.",
    image: "/assets/group-image/Group 51.png",
    bg: "bg-white",
  },
  {
    title: "🎙️ Communication Mastery",
    description:
      "Learn from fluent speakers who know how to teach with clarity and passion.",
    image: "/assets/group-image/Group 50.png",
    bg: "bg-yellow-300",
  },
  {
    title: "🌍 Cultural Insights",
    description:
      "Get insider tips on local customs, traditions, and daily life.",
    image: "/assets/group-image/Group 49.png",
    bg: "bg-yellow-300",
  },
];

export default OurAdvantages;
