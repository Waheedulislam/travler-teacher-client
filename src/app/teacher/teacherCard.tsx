// components/TeacherCard.tsx

import { Card } from "@/components/ui/card";
import { ITeacher } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TeacherCard = ({ teacher }: { teacher: ITeacher }) => {
  console.log(teacher);
  return (
    <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
      <Link href={`/teacher/${teacher._id}`} passHref>
        <Card
          className="overflow-hidden border rounded-2xl lg:w-96 w-80 p-0 mx-auto 
          shadow-md transition-all duration-500 ease-in-out 
          hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] bg-white"
        >
          <div className="relative w-full max-w-96 p-0 h-96 mx-auto rounded-2xl">
            <Image
              src={teacher.image}
              alt={teacher.name}
              fill
              className="object-cover rounded-t-2xl"
            />
          </div>

          <div className="p-4">
            <div className="flex items-center justify-center gap-6 px-4 mb-2">
              <div className="text-lg font-semibold text-gray-800">
                {teacher.name}
              </div>
              <Image
                src={teacher.countryImage}
                alt={teacher.name}
                width={30}
                height={30}
                className="object-cover rounded-full"
              />
              <p className="text-base font-medium text-gray-600">
                {teacher.country}
              </p>
            </div>

            <p className="text-sm font-normal text-center text-gray-700">
              {teacher.description}
            </p>

            <div className="mt-4">
              <button className="w-full px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full font-semibold shadow-md transition duration-300 hover:brightness-110">
                View Profile
              </button>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default TeacherCard;
