import Skeleton from "@/components/shared/Skeleton";
import Title from "@/components/shared/Title";
import { Card } from "@/components/ui/card";

const MostPopularTeachersSkeleton = () => {
  return (
    <div>
      <div>
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6">
          You’re going on a trip, and we’ll provide you with a language teacher
          guide for the language you&lsquo;d like to learn.
        </h1>
      </div>

      <div>
        <Title title="Most Popular Teachers" />
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {[...Array(3)].map((_, i) => (
          <Card
            key={i}
            className="overflow-hidden border shadow-lg rounded-2xl w-80 p-0"
          >
            {/* Image skeleton */}
            <Skeleton className="w-full h-96 rounded-t-2xl" />

            <div className="p-4">
              <div className="flex items-center justify-center gap-4">
                {/* Name skeleton */}
                <Skeleton className="h-6 w-24 rounded" />

                {/* Country image skeleton */}
                <Skeleton className="h-10 w-10 rounded-2xl" />

                {/* Country name skeleton */}
                <Skeleton className="h-6 w-20 rounded" />
              </div>

              {/* Description skeleton */}
              <Skeleton className="h-5 w-64 mt-4 mx-auto rounded" />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Skeleton className="h-12 w-48 rounded-lg" />
      </div>
    </div>
  );
};

export default MostPopularTeachersSkeleton;
