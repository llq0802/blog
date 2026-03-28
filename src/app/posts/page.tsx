import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/PostCard";
import { Search } from "lucide-react";

interface PostsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const tag = typeof params.tag === "string" ? params.tag : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(tag && {
        tags: {
          some: {
            name: tag,
          },
        },
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { publishedAt: "desc" },
    include: { tags: true },
  });

  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            所有文章
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            探索 {posts.length} 篇精彩文章
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-10">
          <form className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="search"
              placeholder="搜索文章..."
              defaultValue={search}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </form>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Link
            href="/posts"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !tag
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            全部
          </Link>
          {tags.map((t) => (
            <Link
              key={t.id}
              href={`/posts?tag=${encodeURIComponent(t.name)}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                tag === t.name
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {t.name}
              <span className="ml-1 text-xs opacity-70">({t._count.posts})</span>
            </Link>
          ))}
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              没有找到相关文章
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              试试其他关键词或标签
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
