/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// get all product
export const getAllCategory = async () => {
  console.log("✅ API BASE:", process.env.NEXT_PUBLIC_BASE_API);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      next: {
        tags: ["category"],
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
