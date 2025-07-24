"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  ImageIcon,
  MessageSquare,
  Tag,
  AlignLeft,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { createArticle } from "@/services/Articles";
import { IArticle } from "@/types";
import Link from "next/link";

export default function CreateArticleForm() {
  const [formData, setFormData] = useState<IArticle>({
    title: "",
    image: "",
    comments: 0,
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "comments" ? Number(value) : value,
    }));
    if (error) setError(null);
  };

  const handleCreate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await createArticle(formData);

      if (res instanceof Error) {
        throw res;
      }

      setSuccess(true);
      setFormData({
        title: "",
        image: "",
        comments: 0,
        category: "",
        description: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Create Article
          </CardTitle>
          <p className="text-gray-500 mt-2">
            Fill in the details below to create a new article
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {success && (
            <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-in slide-in-from-top-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Article created successfully!</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 animate-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <FileText className="w-4 h-4 text-blue-500" />
              Article Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your article title..."
              className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200 bg-white/50"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label
              htmlFor="image"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <ImageIcon className="w-4 h-4 text-purple-500" />
              Featured Image URL
            </label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors duration-200 bg-white/50"
            />
            {formData.image && (
              <div className="mt-2 p-2 bg-gray-50 rounded-lg relative h-32 w-full">
                <Image
                  src={formData.image}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Comments and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="comments"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <MessageSquare className="w-4 h-4 text-green-500" />
                Comments Count
              </label>
              <Input
                id="comments"
                name="comments"
                type="number"
                value={formData.comments}
                onChange={handleChange}
                placeholder="0"
                min={0}
                className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors duration-200 bg-white/50"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <Tag className="w-4 h-4 text-orange-500" />
                Category
              </label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Technology, Lifestyle, etc."
                className="h-12 border-2 border-gray-200 focus:border-orange-500 transition-colors duration-200 bg-white/50"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <AlignLeft className="w-4 h-4 text-indigo-500" />
              Article Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a compelling description for your article..."
              rows={5}
              className="border-2 border-gray-200 focus:border-indigo-500 transition-colors duration-200 resize-none bg-white/50"
            />
          </div>

          {/* Create Button */}
          <div className="pt-6">
            <Button
              onClick={handleCreate}
              disabled={loading}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-600 via-yellow-600 to-orange-600 hover:from-yellow-700 hover:via-orange-700 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Article...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Create Article
                </div>
              )}
            </Button>
          </div>

          {/* Footer Message */}
          <p className="text-center text-sm text-gray-500 pt-4">
            Fill in all details carefully before submitting
          </p>

          {/* Delete Article Text Link */}
          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500">Want to remove an article?</p>
            <Link
              href="/delete-article"
              className="mt-1 inline-block text-sm font-medium text-red-600 hover:underline hover:text-red-700 transition-colors duration-200"
            >
              Go to Delete Article Page
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
