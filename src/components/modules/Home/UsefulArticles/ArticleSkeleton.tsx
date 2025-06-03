import Skeleton from "@/components/shared/Skeleton";
import Title from "@/components/shared/Title";

const ArticleSkeleton = () => {
  return (
    <div>
      <div>
        <Title title="Useful Articles" />
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
      </section>
    </div>
  );
};

export default ArticleSkeleton;
