import { ICategory } from "@/types/category";
import Image from "next/image";
import React from "react";

const CategoryDetails = ({ category }: { category: ICategory }) => {
  return (
    <div>
      <Image
        src={category?.image}
        alt="product image"
        width={500}
        height={500}
        className="rounded-md w-full object-cover h-80"
      />
    </div>
  );
};

export default CategoryDetails;
