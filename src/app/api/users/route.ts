// app/api/users/route.ts
import { getAllUsers } from "@/services/AuthServices";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getAllUsers();

    if (!result?.success) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch users" },
        { status: 500 }
      );
    }

    return NextResponse.json(result.data); // 👈 just the user array
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
