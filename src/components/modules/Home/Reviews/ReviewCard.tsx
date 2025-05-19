import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const ReviewCard = () => {
  return (
    <div>
      <Card className="bg-white shadow-lg rounded-2xl h-full flex flex-col items-center text-center p-4 transition hover:shadow-xl">
        <CardContent className="flex flex-col items-center gap-4">
          <Image
            src={item.avatar}
            width={80}
            height={80}
            alt={item.name}
            className="rounded-full object-cover "
          />
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <span className="text-sm text-gray-500">{item.role}</span>
          <p className="text-md text-gray-700 italic leading-relaxed">
            “{item.review}”
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewCard;
