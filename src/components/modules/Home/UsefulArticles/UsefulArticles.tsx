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
import { getAllArticle } from "@/services/Articles";
import { useEffect, useState } from "react";
import { IArticle } from "@/types";
import ArticleSkeleton from "./ArticleSkeleton";
import Link from "next/link";

export default function UseFulArticles() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllArticle();
        setArticles(response?.data?.result || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Container>
        <ArticleSkeleton />
      </Container>
    );
  }
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
            {articles.map((trip, index) => (
              <SwiperSlide key={index}>
                <Card className="overflow-hidden border rounded-xl transition hover:shadow-lg bg-white">
                  <Link href={`/article/${trip._id}`} passHref>
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      width={500}
                      height={300}
                      className="w-full h-full -mt-10 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </Link>
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
                    <Link href={`/article/${trip._id}`} passHref>
                      <h3 className="text-2xl font-semibold hover:text-orange-700 text-gray-800">
                        {trip.title}
                      </h3>
                    </Link>
                    <p className="text-lg mt-2 font-normal text-gray-600">
                      {trip.description}
                    </p>
                    <Link
                      href={`/article/${trip._id}`}
                      className="text-lg text-[#596B86] font-medium inline-flex items-center gap-1 hover:underline mt-4 hover:text-orange-700"
                    >
                      Read more →
                    </Link>
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
