import HeroSection from "@/components/modules/Home/HeroSection/HeroSection";
import MostPopularTeachers from "@/components/modules/Home/MostPopularTeachers/MostPopularTeachers";
import OurAdvantages from "@/components/modules/Home/OurAdvantages/OurAdvantages";
import PopularCountries from "@/components/modules/Home/PopularCategories/PopularCategories";
import ReviewSection from "@/components/modules/Home/Reviews/Reviews";
import UseFulArticles from "@/components/modules/Home/UsefulArticles/UsefulArticles";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MostPopularTeachers />
      <PopularCountries />
      <OurAdvantages />
      <ReviewSection />
      <UseFulArticles />
    </div>
  );
}
