/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// get all teachers
export const getAllTeachers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/teacher`, {
      next: {
        tags: ["TEACHER"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single teacher
export const getSingleTeacher = async (teacherId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/teacher/${teacherId}`,
      {
        next: {
          tags: ["TEACHER"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
