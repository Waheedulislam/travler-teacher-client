"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { getAllTeachers } from "@/services/TeacherServices";
import { ITeacher } from "@/types";
import MostPopularTeachersSkeleton from "./MostPopularTeachersSkeleton";
import { Star } from "lucide-react";

const MostPopularTeachers = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getAllTeachers();
        setTeachers(response?.data?.result || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <Container>
        <MostPopularTeachersSkeleton />
      </Container>
    );
  }

  return (
    <Container className="bg-gray-50">
      <div
        data-aos="fade-up"
        data-aos-duration="1400"
        data-aos-easing="ease-in-out"
      >
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6">
          You’re going on a trip, and we’ll provide you with a language teacher
          guide for the language you&lsquo;d like to learn.
        </h1>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="1400"
        data-aos-easing="ease-in-out"
      >
        <Title title="Most Popular Teachers" />
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
          className="mb-8 px-4 max-w-6xl mx-auto"
        >
          {teachers.map((teacher, index) => (
            <SwiperSlide key={teacher._id}>
              <div
                data-aos="zoom-in-up"
                data-aos-delay={index * 300}
                data-aos-duration="1400"
                data-aos-easing="ease-in-out"
              >
                <Card className="overflow-hidden border shadow-lg rounded-2xl w-80 p-0 mx-auto transform transition duration-300 hover:scale-105">
                  <Link href={`/teacher/${teacher._id}`} passHref>
                    <div className="relative w-full max-w-80 p-0 h-96 mx-auto rounded-2xl">
                      <Image
                        src={teacher.image}
                        alt={teacher.name}
                        fill
                        className="object-cover w-96"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-lg font-semibold ml-2">
                          {teacher.name}
                        </div>
                        <Image
                          src={teacher.countryImage}
                          alt={teacher.name}
                          width={40}
                          height={40}
                          className="object-cover rounded-2xl"
                        />
                        <p className="text-lg font-semibold">
                          {teacher.country}
                        </p>
                      </div>

                      <div className="my-2 font-semibold text-center text-gray-700">
                        {teacher.description}
                      </div>

                      {/* 🔥 Review Section */}
                      <div className="flex items-center justify-center gap-1 mt-3 text-yellow-500">
                        <Star className="w-5 h-5 fill-yellow-400" />
                        <span className="text-sm font-medium text-gray-800">
                          {teacher.review ?? "4.8"} / 5
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="1400"
          data-aos-easing="ease-in-out"
        >
          <Link href="/teacher">
            <Button className="cursor-pointer bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-8 py-6 text-sm font-semibold rounded-sm shadow-md hover:brightness-110 transition">
              View All Teachers
            </Button>
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default MostPopularTeachers;
