"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IArticle } from "@/types";
import { Share2, MessageCircle, ArrowLeft, Bookmark, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const ArticleDetails = ({ article }: { article: IArticle }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [views] = useState(1247);

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    return diffInHours < 24
      ? `${diffInHours}h ago`
      : `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleButtonComment = () => {
    toast.warning("Comments are temporarily disabled.");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      toast.info("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-teal-50 text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-sm font-medium">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`gap-2 ${
                isBookmarked ? "text-teal-600 bg-teal-100" : "hover:bg-gray-100"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
              />
              {isBookmarked ? "Saved" : "Save"}
            </Button>
            <Button
              onClick={handleShare}
              variant="ghost"
              className="gap-2 hover:bg-gray-100"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Article Section */}
      <article className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="space-y-6">
          <div className="flex justify-between items-center">
            <Badge className="px-4 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-full">
              {article.category}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>
                {article.createdAt
                  ? formatTimeAgo(article.createdAt)
                  : "Unknown date"}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {views.toLocaleString()}
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {article.title}
          </h1>
        </header>

        {/* Featured Image */}
        <div className="mt-10 rounded-3xl overflow-hidden shadow-xl group relative">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            width={1200}
            height={600}
            className="w-full h-[400px] sm:h-[600px] object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
        {/* Description  */}
        <div>
          <p className="text-lg text-gray-600 max-w-3xl">
            {article.description}
          </p>
        </div>

        {/* Comments */}
        <section className="mt-16">
          <div className="bg-white/90 backdrop-blur rounded-2xl border border-gray-200 p-8 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Comments ({article.comments})
              </h2>
              <Button
                onClick={handleButtonComment}
                className="cursor-pointer bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
              >
                Add Comment
              </Button>
            </div>
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
              Be the first to comment on this article!
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default ArticleDetails;
