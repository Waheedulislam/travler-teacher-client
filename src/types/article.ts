export interface IArticle {
  _id?: string;
  title: string;
  image: string;
  category: string;
  comments: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}
