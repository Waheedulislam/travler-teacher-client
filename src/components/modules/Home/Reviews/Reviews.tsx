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
import AOS from "aos";
import "aos/dist/aos.css";

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
        AOS.refresh();
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-14 bg-gradient-to-r from-white to-blue-50">
      <Container className="px-6 text-center">
        <Title title="Student Reviews" />

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-12"
        >
          {reviews.map((item, idx) => (
            <SwiperSlide key={idx}>
              <Card
                data-aos="fade-up"
                data-aos-delay={idx * 200}
                data-aos-duration="1000"
                className="bg-white shadow-xl rounded-2xl h-full flex flex-col items-center text-center p-6 transition hover:shadow-2xl"
              >
                <CardContent className="flex flex-col items-center gap-5">
                  <Image
                    src={item.avatar}
                    width={120}
                    height={120}
                    alt={item.name}
                    className="rounded-full object-cover border-4 border-white shadow-md ring-2 ring-orange-300"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <span className="text-sm text-gray-500 italic">
                    {item.role}
                  </span>
                  <p className="text-gray-700 text-base leading-relaxed italic px-2">
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
