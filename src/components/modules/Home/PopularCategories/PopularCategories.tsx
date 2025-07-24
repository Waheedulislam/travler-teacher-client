"use client";

import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllCategory } from "@/services/CategoryServices";
import { ICategory } from "@/types/category";
import CategorySkeleton from "./CategorySkeleton";

const PopularCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response?.data?.result || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Container>
        <CategorySkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <div
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="1200"
        data-aos-easing="ease-in-out"
      >
        <Title title="Popular Countries" />
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-easing="ease-in-out"
      >
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6">
          Explore unique learning + travel opportunities around the world.
        </h1>
      </div>

      <section className="py-12 text-center">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={0}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mb-8 px-4 max-w-6xl mx-auto"
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={cat._id || index}>
              <Link href={`/category/${cat._id}`} passHref>
                <div
                  className="group relative w-full max-w-xs mx-auto overflow-hidden rounded-xl bg-white shadow-md transition-all duration-500 ease-in-out hover:scale-[1.04] hover:shadow-xl cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay={index * 200}
                  data-aos-duration="1200"
                  data-aos-easing="ease-in-out"
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    height={420}
                    width={420}
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:blur-lg"
                  />

                  {/* Hover Overlay with black bg */}
                  <div className="absolute inset-0  bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-center items-center p-6 text-white font-bold text-center">
                    <p
                      className="text-sm mb-4 max-w-[90%] leading-relaxed  bg-opacity-70 px-3 py-1 rounded"
                      title={cat.description}
                    >
                      {cat.description && cat.description.length > 100
                        ? cat.description.slice(0, 100) + "..."
                        : cat.description ||
                          "Explore our unique courses and experiences."}
                    </p>
                    <span
                      className="
                        inline-block px-6 py-2 border rounded-lg border-transparent 
                        text-white text-sm font-semibold 
                        bg-gradient-to-r from-orange-400 to-yellow-400
                        shadow-md
                        hover:brightness-110
                        transition-all duration-300 ease-in-out
                        cursor-pointer select-none
                        focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2
                      "
                    >
                      Explore Courses
                    </span>
                  </div>

                  {/* Card Title */}
                  <div className="absolute bottom-0 w-full bg-sky-500/90 backdrop-blur-sm text-white text-sm font-semibold py-4 text-center rounded-b-xl transition-colors duration-500 ease-in-out group-hover:bg-sky-600">
                    {cat.title}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="1200"
          data-aos-easing="ease-in-out"
        >
          <Link href="/category">
            <Button className="cursor-pointer bg-gradient-to-r mt-10 from-orange-400 to-yellow-400 text-white px-8 py-6 text-sm font-semibold rounded-sm shadow-md hover:brightness-110 transition duration-500 ease-in-out">
              View All Countries
            </Button>
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default PopularCategories;
