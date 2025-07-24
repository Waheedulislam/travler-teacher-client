"use client";

import { ICategory } from "@/types/category";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1200"
      data-aos-easing="ease-in-out"
    >
      <Link href={`/category/${category._id}`} passHref>
        <div className="group relative w-full max-w-xs mx-auto overflow-hidden rounded-xl bg-white shadow-md transition-all duration-500 ease-in-out hover:scale-[1.04] hover:shadow-xl cursor-pointer">
          {/* Image */}
          <Image
            src={category.image}
            alt={category.title}
            height={420}
            width={420}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:blur-lg"
          />

          {/* Hover overlay with black background */}
          <div className="absolute inset-0  bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-center items-center p-6 text-white font-bold text-center">
            <p
              className="text-sm mb-4 max-w-[90%] leading-relaxed px-3 py-1 rounded"
              title={category.description}
            >
              {category.description && category.description.length > 100
                ? category.description.slice(0, 100) + "..."
                : category.description ||
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

          {/* Card title */}
          <div className="absolute bottom-0 w-full bg-sky-500/90 backdrop-blur-sm text-white text-sm font-semibold py-4 text-center rounded-b-xl transition-colors duration-500 ease-in-out group-hover:bg-sky-600">
            {category.title}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;
