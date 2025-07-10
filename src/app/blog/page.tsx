"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronRight,
  Home,
  Play,
  MapPin,
  GraduationCap,
  Camera,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { IArticle } from "@/types";
import { getAllArticle } from "@/services/Articles";

export default function BlogPage() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const featuredPosts = [
    {
      id: 1,
      title: "Essential Photography Tips for Educational Tours",
      image:
        "https://b2442125.smushcdn.com/2442125/wp-content/uploads/2024/10/IMG_0174.jpg?lossy=1&strip=1&webp=1",
      category: "Photography",
      icon: Camera,
      videoUrl: "https://youtu.be/LDPpz_dF9Og?si=fPpis684DwXxMjp0",
    },
    {
      id: 2,
      title: "How to Plan the Perfect Historical Site Visit for Students",
      image:
        "https://owlcation.com/.image/t_share/MjAwNzczMDcyOTg5NDYzOTM4/how-to-plan-a-field-trip.jpg",
      category: "Education",
      icon: GraduationCap,
      videoUrl: "https://youtu.be/OKCkLFVl80U?si=VjdIz1RLql36uN0M",
    },
    {
      id: 3,
      title: "Top 10 Cultural Destinations Every Teacher Should Know",
      image:
        "https://www.holidify.com/images/cmsuploads/compressed/vietnam-cambodia-6-min-2_20190207000750.jpg",
      category: "Travel",
      icon: MapPin,
      videoUrl: "https://youtu.be/XwxMKPwLtTI?si=mrCHPZq1wMoj4QPG",
    },
    {
      id: 4,
      title: "Safety Guidelines for International Student Tours",
      image:
        "https://www.peru-explorer.com/wp-content/uploads/international-student-security-1024x585.jpg",
      category: "Safety",
      icon: GraduationCap,
      videoUrl: "https://youtu.be/6wVQfKXvQ40?si=x_TTMgYa222S0Ytk",
    },
  ];

  useEffect(() => {
    AOS.init({ once: true });

    const fetchArticles = async () => {
      try {
        const response = await getAllArticle();
        setArticles(response?.data?.result || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600 font-medium">Blog</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {loading ? (
                <div className="text-center py-12">Loading...</div>
              ) : articles.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    No blogs found
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Start your educational travel journey by exploring our
                    featured posts.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Recent Posts
                  </h3>
                  {articles.map((article) => (
                    <Link key={article._id} href={`/article/${article._id}`}>
                      <Card className="p-4 space-y-2">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          width={700}
                          height={300}
                          className="rounded-md w-full h-60 object-cover"
                        />
                        <div>
                          <span className="text-sm text-blue-600 font-medium uppercase">
                            {article.category}
                          </span>
                          <h4 className="text-xl font-bold mt-2 text-gray-900">
                            {article.title}
                          </h4>
                          <p className="text-gray-600 mt-1 text-sm">
                            {article.description}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && (
                <div className="border-t pt-8 mt-8 flex items-center justify-between">
                  <Button variant="outline" disabled className="px-6">
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">Page 1 of 1</span>
                  <Button variant="outline" disabled className="px-6">
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Featured Posts */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Featured Posts
              </h3>
              <div className="space-y-4">
                {featuredPosts.map((post) => (
                  <a
                    key={post.id}
                    href={post.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={350}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center mb-2">
                            <post.icon className="w-4 h-4 text-white/80 mr-2" />
                            <span className="text-xs text-white/80 uppercase tracking-wide font-medium">
                              {post.category}
                            </span>
                          </div>
                          <h4 className="text-white font-semibold text-sm leading-tight">
                            {post.title}
                          </h4>
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
