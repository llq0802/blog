import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      slug: customSlug,
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

    const slug = customSlug || slugify(title);

    // Check if slug already exists
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { message: "文章别名已存在，请修改标题或自定义别名" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        published: published || false,
        publishedAt: published ? new Date() : null,
        tags: {
          connect: selectedTags?.map((id: string) => ({ id })) || [],
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { message: "创建文章失败" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { tags: true },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { message: "获取文章列表失败" },
      { status: 500 }
    );
  }
}
