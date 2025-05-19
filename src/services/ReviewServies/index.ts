/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// get all reviews
export const getAllReview = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review`, {
      next: {
        tags: ["REVIEW"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// add product
export const addReview = async (productData: FormData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/create-review`,
      {
        method: "POST",
        body: productData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("REVIEW");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update product
export const updateProduct = async (
  productData: FormData,
  productId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: "PATCH",
        body: productData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("REVIEW");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
