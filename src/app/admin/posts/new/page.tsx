import { PostEditor } from "@/components/PostEditor";
import { prisma } from "@/lib/prisma";

export default async function NewPostPage() {
  const tags = await prisma.tag.findMany();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            新建文章
          </h1>
          <PostEditor tags={tags} />
        </div>
      </div>
    </div>
  );
}
