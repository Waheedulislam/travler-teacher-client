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
import { getAllReview } from "@/services/ReviewServies";
import { useEffect, useState } from "react";

interface IReview {
  name: string;
  role: string;
  avatar: string;
  review: string;
}

export default function ReviewSection() {
  const [reviews, setReviews] = useState<IReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReview();
        const fetchedReviews: IReview[] = response?.data?.result || [];
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-10 bg-gradient-to-r from-white to-blue-50">
      <Container className="px-8 text-center">
        <Title title="Student Reviews" />

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
                    className="rounded-full object-cover"
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
