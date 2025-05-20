import { ICategory } from "@/types/category";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <div>
      <div className="relative w-full max-w-xs mx-auto overflow-hidden rounded-xl transform transition duration-300 hover:scale-105 shadow-md hover:shadow-lg">
        {/* Image */}

        <Link href={`/category/${category._id}`} passHref>
          <Image
            src={category.image}
            alt={category.title}
            height={420}
            width={420}
            className="object-cover rounded-xl"
          />

          {/* Title overlay */}
          <div className="absolute bottom-0 w-full bg-sky-400 text-white text-sm font-medium py-4 text-center rounded-b-xl">
            {category.title}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
