import type { ICategory } from "@/types/category";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CategoryDetails = ({ category }: { category: ICategory }) => {
  // Format dates for better readability
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fallback image in case category.image is missing or invalid
  const imageSrc = category?.image;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden bg-white shadow-md">
        <div className="relative h-80 w-full">
          <Image
            src={imageSrc}
            alt={`${category?.title || "Category"} category image`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <Badge variant="secondary" className="mb-2">
              Category
            </Badge>
            <h1 className="text-3xl font-bold text-white mb-2">
              {category?.title}
            </h1>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Created: {formatDate(category?.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last updated: {formatDate(category?.updatedAt)}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Category Information
              </h2>
              <dl className="grid grid-cols-1 gap-3">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    ID
                  </dt>
                  <dd className="mt-1 text-sm">{category?._id}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Title
                  </dt>
                  <dd className="mt-1 text-sm">{category?.title}</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">
                Related Information
              </h2>
              <p className="text-sm text-muted-foreground">
                This category was created on {formatDate(category?.createdAt)}{" "}
                and last updated on {formatDate(category?.updatedAt)}.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
