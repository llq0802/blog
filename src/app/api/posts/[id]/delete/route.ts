import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.redirect(new URL("/admin/posts", request.url));
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json(
      { message: "删除文章失败" },
      { status: 500 }
    );
  }
}
