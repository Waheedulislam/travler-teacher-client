// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  (await cookieStore).delete("accessToken");
  return NextResponse.json({ message: "Logged out" }, { status: 200 });
}
