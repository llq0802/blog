import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      published,
      selectedTags,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "标题和内容不能为空" },
        { status: 400 }
      );
    }

    // Check if slug already exists (excluding current post)
    if (slug) {
      const existingPost = await prisma.post.findFirst({
        where: {
          slug,
          id: { not: id },
        },
      });

      if (existingPost) {
        return NextResponse.json(
          { message: "文章别名已存在，请修改" },
          { status: 400 }
        );
      }
    }

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        published: published || false,
        publishedAt:
          published && !existingPost?.publishedAt
            ? new Date()
            : existingPost?.publishedAt,
        tags: {
          set: selectedTags?.map((id: string) => ({ id })) || [],
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json(
      { message: "更新文章失败" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: "删除成功" });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return NextResponse.json(
      { message: "删除文章失败" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!post) {
      return NextResponse.json(
        { message: "文章不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json(
      { message: "获取文章失败" },
      { status: 500 }
    );
  }
}
