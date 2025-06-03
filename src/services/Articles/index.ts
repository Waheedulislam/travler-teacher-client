/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// get all article
export const getAllArticle = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/article`, {
      next: {
        tags: ["ARTICLE"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
// get single teacher
export const getSingleArticle = async (articleId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/article/${articleId}`,
      {
        next: {
          tags: ["ARTICLE"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
