"use client";
import Image from "next/image";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NMDateComponents from "@/components/ui/core/NMDateComponents/NMDateComponents";

import { useEffect, useState } from "react";
import { ITeacher } from "@/types";
import { getAllTeachers } from "@/services/TeacherServices";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getAllTeachers();
        setTeachers(response?.data?.result || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);
  return (
    <Container className="bg-gray-50">
      <div className="mt-10">
        <Title title="All Teachers" />
      </div>
      <div>
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6">
          Join us — invite friends or find new knowledge
        </h1>
      </div>
      {/* section-2  */}
      <NMDateComponents />

      {/* section-3  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-8 px-4 py-12 ">
        {teachers.map((teacher, index) => (
          <Card
            key={index}
            className="overflow-hidden border shadow-lg rounded-2xl w-80 p-0 mx-auto"
          >
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
        ))}
      </div>
      <div className="text-center mb-12">
        <Button className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-8 py-6 text-sm font-semibold rounded-sm shadow-md hover:brightness-110 transition">
          Load More
        </Button>
      </div>
    </Container>
  );
};

export default AllTeachers;
