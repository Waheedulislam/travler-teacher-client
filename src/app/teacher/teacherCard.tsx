import { Card } from "@/components/ui/card";
import { ITeacher } from "@/types";
import Image from "next/image";
import React from "react";

const TeacherCard = ({ teacher }: { teacher: ITeacher }) => {
  return (
    <div>
      <Card className="overflow-hidden border rounded-2xl w-80 p-0 mx-auto transform transition duration-300 hover:scale-105 shadow-md hover:shadow-lg">
        <div className="relative w-full max-w-80  p-0 h-96 mx-auto rounded-2xl">
          <Image
            src={teacher.image}
            alt={teacher.name}
            fill
            className="object-cover w-96"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-center gap-12 px-12">
            <div className="text-lg font-semibold ml-2">{teacher.name}</div>
            <Image
              src={teacher.countryImage}
              alt={teacher.name}
              width={40}
              height={40}
              className="object-cover rounded-2xl"
            />
            <p className="text-lg font-semibold mr-2">{teacher.country}</p>
          </div>
          <div className="my-2 font-semibold text-center text-gray-700">
            {teacher.description}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherCard;
