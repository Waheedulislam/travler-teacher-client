"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { MessageSquare, Plane } from "lucide-react";
import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";

export default function UseFulArticles() {
  return (
    <Container>
      <div>
        <Title title="Useful Articles" />
      </div>
      <section className="py-16 ">
        <div className=" px-4">
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
            {trips.map((trip, index) => (
              <SwiperSlide key={index}>
                <Card className="overflow-hidden border rounded-xl transition hover:shadow-lg bg-white">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    width={500}
                    height={300}
                    className="w-full h-full -mt-10"
                  />
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-lg text-gray-500 space-x-4">
                      <div className="flex items-center gap-2">
                        <Plane className="w-7 7 text-orange-500" />
                        <span>{trip.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-7 h-7 text-orange-500" />
                        <span>{trip.comments} Comments</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {trip.title}
                    </h3>
                    <p className="text-lg font-normal text-gray-600">
                      {trip.description}
                    </p>
                    <a
                      href="#"
                      className="text-lg text-[#596B86] font-medium inline-flex items-center gap-1 hover:underline mt-4"
                    >
                      Read more →
                    </a>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white  px-12 py-6 my-10 text-sm font-semibold rounded-sm shadow-md hover:brightness-110 transition"
          >
            Read all articles
          </Button>
        </div> */}
      </section>
    </Container>
  );
}
const trips = [
  {
    title: "Vacation in Madrid",
    image: "/assets/articales-image/gerson-repreza-CepDpEiALqM-unsplash 1.png",
    comments: 2,
    category: "Travel",
    description:
      "A trip with a tour guide to the most unknown places of the city.",
  },
  {
    title: "Vacation in Pennsylvania",
    image: "/assets/articales-image/house-isolated-field 1.png",
    comments: 2,
    category: "Travel",
    description:
      "A trip with a tour guide to the most unknown places of the city.",
  },
  {
    title: "Vacation in New York",
    image: "/assets/articales-image/chris-barbalis-IQMG9KbT4yE-unsplash 1.png",
    comments: 2,
    category: "Travel",
    description:
      "A trip with a tour guide to the most unknown places of the city.",
  },
  {
    title: "Vacation in New York",
    image: "/assets/articales-image/chris-barbalis-IQMG9KbT4yE-unsplash 1.png",
    comments: 2,
    category: "Travel",
    description:
      "A trip with a tour guide to the most unknown places of the city.",
  },
];
