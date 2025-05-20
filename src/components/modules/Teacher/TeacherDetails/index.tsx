import { ITeacher } from "@/types";
import Image from "next/image";
import React from "react";

const TeacherDetails = ({ teacher }: { teacher: ITeacher }) => {
  return (
    <div>
      <Image
        src={teacher?.image}
        alt="product image"
        width={500}
        height={500}
        className="rounded-md w-full object-cover h-80"
      />
    </div>
  );
};

export default TeacherDetails;
