import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostEditor } from "@/components/PostEditor";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  const [post, tags] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
      include: { tags: true },
    }),
    prisma.tag.findMany(),
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            编辑文章
          </h1>
          <PostEditor post={post} tags={tags} />
        </div>
      </div>
    </div>
  );
}
