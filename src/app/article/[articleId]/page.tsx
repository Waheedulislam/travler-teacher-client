import ArticleDetails from "@/components/modules/Articles/ArticleDetails";
import Container from "@/components/shared/Container";
import { getSingleArticle } from "@/services/Articles";

const articleDetailsPage = async ({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) => {
  const { articleId } = await params;
  const { data: article } = await getSingleArticle(articleId);

  return (
    <Container>
      <ArticleDetails article={article} />
    </Container>
  );
};

export default articleDetailsPage;
