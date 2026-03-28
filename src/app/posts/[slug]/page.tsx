import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { MarkdownContent } from "@/components/MarkdownContent";
import { Calendar, Eye, ArrowLeft, Tag, User } from "lucide-react";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { tags: true },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Increment views
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  const relatedPosts = await prisma.post.findMany({
    where: {
      published: true,
      id: { not: post.id },
      OR: [
        { tags: { some: { id: { in: post.tags.map((t) => t.id) } } } },
      ],
    },
    take: 3,
    include: { tags: true },
  });

  return (
    <article className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回文章列表
        </Link>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/posts?tag=${encodeURIComponent(tag.name)}`}
                className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {tag.name}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {post.views + 1} 次阅读
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <MarkdownContent content={post.content} />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-4xl mx-auto mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              相关文章
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/posts/${relatedPost.slug}`}
                  className="group block p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg transition-all"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {relatedPost.excerpt || "暂无摘要"}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
