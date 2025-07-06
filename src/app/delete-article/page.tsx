"use client";

import { useEffect, useState } from "react";
import { deleteArticle, getAllArticle } from "@/services/Articles";
import { IArticle } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function ArticleListPage() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getAllArticle();

        // Ensure it's an array before setting
        const result = Array.isArray(response?.data?.result)
          ? response.data.result
          : [];

        setArticles(result);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the article.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteArticle(id);
        console.log(res);
        if (res instanceof Error) {
          toast.error(res.message);
        } else {
          toast.success("Article deleted successfully!");
          setArticles((prev) => prev.filter((article) => article._id !== id));
        }
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-sky-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        All Articles
      </h1>

      {loading && (
        <p className="text-center text-blue-600 font-medium">
          Loading articles...
        </p>
      )}
      {error && <p className="text-center text-red-500 font-medium">{error}</p>}

      {!loading && articles.length === 0 && (
        <p className="text-center text-gray-500">No articles found.</p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card
            key={article._id}
            className="relative group hover:shadow-xl transition duration-300 border border-gray-200"
          >
            {article.image && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-md">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {article.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col justify-between space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">
                {article.description}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="bg-blue-100 px-2 py-1 rounded-md text-blue-800">
                  {article.category}
                </span>
                <span className="bg-green-100 px-2 py-1 rounded-md text-green-700">
                  {article.comments} comments
                </span>
              </div>

              <Button
                variant="destructive"
                onClick={() => handleDelete(article._id!)}
                className="mt-2 w-full flex items-center gap-2 hover:scale-[1.02] transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete Article
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
