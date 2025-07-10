import CategoryDetails from "@/components/modules/Categories/CategoryDetails";
import Container from "@/components/shared/Container";
import { getSingleCategory } from "@/services/CategoryServices";

const categoryDetailsPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  const { data: category } = await getSingleCategory(categoryId);
  return (
    <Container>
      <CategoryDetails category={category} />
    </Container>
  );
};

export default categoryDetailsPage;
