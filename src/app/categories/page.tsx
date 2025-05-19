import Container from "@/components/shared/Container";
import Title from "@/components/shared/Title";
import "swiper/css";
import "swiper/css/navigation";
import NMDateComponents from "@/components/ui/core/NMDateComponents/NMDateComponents";
import CategoryCard from "./categoryCard";
import { getAllCategory } from "@/services/CategoryServices";
import { ICategory } from "@/types/category";

const PopularCategories = async () => {
  const response = await getAllCategory();
  const categories: ICategory[] = response?.data?.result || [];

  return (
    <Container>
      <div>
        <Title title="All Categories" />
      </div>

      <div>
        <h1 className="italic text-center text-xl font-normal mt-8 lg:mb-14 mb-6">
          Join us — invite friends or find new knowledge
        </h1>
      </div>

      {/* section-2 */}
      <NMDateComponents />

      {/* section-3 */}
      <section className="py-12 text-center my-10">
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center px-4 gap-10">
          {categories.map((category: ICategory, index: number) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default PopularCategories;
