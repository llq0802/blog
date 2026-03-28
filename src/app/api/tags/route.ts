import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ message: '标签名称不能为空' }, { status: 400 });
    }

    const normalizedName = name.trim();

    if (normalizedName.length === 0) {
      return NextResponse.json({ message: '标签名称不能为空' }, { status: 400 });
    }

    // Check if tag already exists
    const existingTag = await prisma.tag.findUnique({
      where: { name: normalizedName },
    });

    if (existingTag) {
      return NextResponse.json(existingTag);
    }

    const tag = await prisma.tag.create({
      data: { name: normalizedName },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error('Failed to create tag:', error);
    return NextResponse.json({ message: '创建标签失败' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return NextResponse.json({ message: '获取标签列表失败' }, { status: 500 });
  }
}
