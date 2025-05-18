"use client";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllCategory } from "@/services/CategoryServices";
import { ICategory } from "@/types/category";

const PopularCategories = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response?.data?.result || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // avoid hydration mismatch

  return (
    <Container>
      <div>
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6">
          You’re going on a trip, and we’ll provide you with a language teacher
          guide for the language you&lsquo;d like to learn.
        </h1>
      </div>
      <div>
        <Title title="Popular Categories" />
      </div>

      <section className="py-12 text-center">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mb-8 px-4"
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full max-w-xs mx-auto overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  height={420}
                  width={420}
                  className="object-cover"
                />
                <div className="absolute bottom-0 w-full bg-sky-400 text-white text-sm font-medium py-4 text-center rounded-b-xl">
                  {cat.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link href="categories">
          <Button className="cursor-pointer bg-gradient-to-r mt-10 from-orange-400 to-yellow-400 text-white px-8 py-6 text-sm font-semibold rounded-sm shadow-md hover:brightness-110 transition">
            View All Categories
          </Button>
        </Link>
      </section>
    </Container>
  );
};

export default PopularCategories;
