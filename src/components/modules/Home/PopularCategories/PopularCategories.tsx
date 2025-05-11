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

const PopularCategories = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // avoid hydration mismatch
  return (
    <Container>
      <div>
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6  ">
          Вы едете в путешествие, а мы вам предоставляем гида учителя языка,
          который вам бы хотелось изучить.
        </h1>
      </div>
      <div>
        <Title title="Популярные категории" />
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
              <SwiperSlide key={index}>
                <div className="relative w-full max-w-xs  mx-auto overflow-hidden">
                  {/* Image */}
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    height="420"
                    width="420"
                    className="object-cover"
                  />

                  {/* Title on top of image */}
                  <div className="absolute bottom-0 w-full bg-sky-400 text-white text-sm font-medium py-4 text-center rounded-b-xl">
                    {cat.title}
                  </div>
                </div>
              </SwiperSlide>
            </SwiperSlide>
          ))}
        </Swiper>
        <Link href="categories"></Link>

        <Button className="cursor-pointer bg-gradient-to-r mt-10 from-orange-400 to-yellow-400 text-white  px-8 py-6 text-sm font-semibold rounded-sm shadow-md hover:brightness-110 transition">
          Смотреть все категории
        </Button>
      </section>
    </Container>
  );
};

const categories = [
  {
    title: "Итальянский в Риме",
    image: "/assets/Category-image/Rectangle1.png",
  },
  {
    title: "Английский в Лондоне",
    image: "/assets/Category-image/Rectangle2.png",
  },
  {
    title: "Испанский в Барселоне",
    image: "/assets/Category-image/Rectangle3.png",
  },
  {
    title: "Испанский в Барселоне",
    image: "/assets/Category-image/Rectangle3.png",
  },
];

export default PopularCategories;
