import Skeleton from "@/components/shared/Skeleton";
import Title from "@/components/shared/Title";

const CategorySkeleton = () => {
  return (
    <div>
      <div>
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6">
          You’re going on a trip, and we’ll provide you with a language teacher
          guide for the language you&lsquo;d like to learn.
        </h1>
      </div>
      <div>
        <Title title="Popular Categories" />
      </div>

      <section className="py-12 text-center">
        <div className="flex justify-center gap-6 px-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="w-full max-w-xs rounded-xl overflow-hidden bg-white shadow-md p-0"
            >
              <Skeleton className="h-[260px] w-full mb-3 rounded-t-xl" />
              <Skeleton className="h-10 w-3/4 mx-auto mb-5 rounded-md" />
              <Skeleton className="h-5 w-1/2 mx-auto mb-6 rounded-md" />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Skeleton className="h-12 w-48 rounded-lg" />
        </div>
      </section>
    </div>
  );
};

export default CategorySkeleton;
