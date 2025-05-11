"use client";
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

const MostPopularTeachers = () => {
  return (
    <Container className="bg-gray-50">
      <div>
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6  ">
          Вы едете в путешествие, а мы вам предоставляем гида учителя языка,
          который вам бы хотелось изучить.
        </h1>
      </div>
      <div>
        <Title title="Самые популярные учителя" />
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
          className="mb-8 px-4"
        >
          {teachers.map((teacher, index) => (
            <SwiperSlide key={index}>
              <SwiperSlide key={index}>
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
                    <div className="flex items-center justify-center gap-20 px-12">
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
                      <p className="text-lg font-semibold mr-2">
                        {teacher.country}
                      </p>
                    </div>
                    <div className="my-2 font-semibold text-center text-gray-700">
                      {teacher.description}
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            </SwiperSlide>
          ))}
        </Swiper>

        <Link href="teacher">
          <Button className="cursor-pointer bg-gradient-to-r from-orange-400 to-yellow-400 text-white  px-8 py-6 text-sm font-semibold rounded-sm shadow-md hover:brightness-110 transition">
            Смотреть все категории
          </Button>
        </Link>
      </section>
    </Container>
  );
};
const teachers = [
  {
    name: "Natali",
    image: "/assets/teacher-image/teacher1.png",
    country: "UK",
    description: "от 500р за урок",
    countryImage:
      "https://png.pngtree.com/png-clipart/20220721/ourmid/pngtree-flag-of-uk-united-kingdom-brush-png-image_6032661.png",
  },
  {
    name: "Marcus",
    image: "/assets/teacher-image/teacher2.png",
    country: "Spain",
    description: "от 800р за урок",
    countryImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiKT5PL31PdRLQ9x9uXIwXiLQHi3mvmXgAnA&s",
  },
  {
    name: "Lili",
    image: "/assets/teacher-image/teacher3.png",
    country: "France",
    description: "от 300р за урок",
    countryImage: "https://cdn.worldvectorlogo.com/logos/france.svg",
  },
  {
    name: "Lili",
    image: "/assets/teacher-image/teacher3.png",
    country: "France",
    description: "от 300р за урок",
    countryImage: "https://cdn.worldvectorlogo.com/logos/france.svg",
  },
];

export default MostPopularTeachers;
