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
                <div className="relative w-full max-w-xs h-96 mx-auto rounded-2xl overflow-hidden shadow-lg border ">
                  {/* Image */}
                  <div>
                    <Image
                      src={teacher.image}
                      alt={teacher.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <Card className=" mx-10  border border-white">
                  <div className="">
                    <div className="flex items-center justify-center gap-20 ">
                      <div className="text-lg font-semibold">
                        {teacher.name}
                      </div>
                      <Image
                        src={teacher.countryImage}
                        alt={teacher.name}
                        width={50}
                        height={50}
                        className="object-cover rounded-xl"
                      />
                      <p className="text-lg font-semibold">{teacher.country}</p>
                    </div>
                    <div className="my-2 font-semibold text-gray-700">
                      {teacher.description}
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            </SwiperSlide>
          ))}
        </Swiper>

        <Button className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white  px-8 py-6 text-sm font-semibold rounded-sm shadow-md hover:brightness-110 transition">
          Смотреть все категории
        </Button>
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
