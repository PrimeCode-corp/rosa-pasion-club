import { NextResponse } from "next/server";
import { mockSocialPosts } from "@/lib/mock/data";

// Mock: reemplaza la consulta a prisma.socialPost del proyecto original.
export async function GET() {
  return NextResponse.json({
    success: true,
    posts: mockSocialPosts,
    count: mockSocialPosts.length,
  });
}
