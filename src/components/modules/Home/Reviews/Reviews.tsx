"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Title from "@/components/shared/Title";
import Container from "@/components/shared/Container";

const reviews = [
  {
    name: "Anna Smirnova",
    role: "Student from Moscow",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
    review:
      "Wonderful lessons! The teacher was very professional and made learning the language engaging and useful.",
  },
  {
    name: "Ivan Kozlov",
    role: "Tourist",
    avatar:
      "https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww",
    review:
      "I really enjoyed the cultural classes. Learned a lot of interesting things about local traditions! Lively and interesting lessons.",
  },
  {
    name: "Maria Ivanova",
    role: "Traveler",
    avatar:
      "https://media.istockphoto.com/id/1618846975/photo/smile-black-woman-and-hand-pointing-in-studio-for-news-deal-or-coming-soon-announcement-on.jpg?s=612x612&w=0&k=20&c=LUvvJu4sGaIry5WLXmfQV7RStbGG5hEQNo8hEFxZSGY=",
    review:
      "The teacher explains the material perfectly and makes each lesson unforgettable.",
  },
  {
    name: "Maria Ivanova",
    role: "Traveler",
    avatar:
      "https://media.istockphoto.com/id/1618846975/photo/smile-black-woman-and-hand-pointing-in-studio-for-news-deal-or-coming-soon-announcement-on.jpg?s=612x612&w=0&k=20&c=LUvvJu4sGaIry5WLXmfQV7RStbGG5hEQNo8hEFxZSGY=",
    review:
      "The teacher explains the material perfectly and makes each lesson unforgettable.",
  },
];
export default function ReviewSection() {
  return (
    <section className="py-10 bg-gradient-to-r from-white to-blue-50">
      <Container className=" px-8  text-center">
        <Title title="Student Reviews"></Title>

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
          className="mb-8 px-4 lg:mt-20 mt-10"
        >
          {reviews.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Card className="bg-white shadow-lg rounded-2xl h-full flex flex-col items-center text-center p-4 transition hover:shadow-xl">
                <CardContent className="flex flex-col items-center gap-4">
                  <Image
                    src={item.avatar}
                    width={80}
                    height={80}
                    alt={item.name}
                    className="rounded-full object-cover "
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <span className="text-sm text-gray-500">{item.role}</span>
                  <p className="text-md text-gray-700 italic leading-relaxed">
                    “{item.review}”
                  </p>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
