"use client";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import NMDateComponents from "@/components/ui/core/NMDateComponents/NMDateComponents";
import { ICategory } from "@/types/category";
import { useEffect, useState } from "react";
import { getAllCategory } from "@/services/CategoryServices";

const PopularCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response?.data?.result || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);
  return (
    <Container>
      <div>
        <Title title="All Categories" />
      </div>
      <div>
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6  ">
          Join us — invite friends or find new knowledge
        </h1>
      </div>
      {/* section-2  */}
      <NMDateComponents />

      {/* section-3  */}
      <section className="py-12 text-center my-10">
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center  px-4 gap-10 ">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="relative w-full max-w-xs  mx-auto overflow-hidden"
            >
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
          ))}
        </div>

        <Button className="bg-gradient-to-r mt-10 from-orange-400 to-yellow-400 text-white  px-8 py-6 text-sm font-semibold rounded-sm shadow-md hover:brightness-110 transition">
          Load More
        </Button>
      </section>
    </Container>
  );
};

export default PopularCategories;
