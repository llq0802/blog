import Link from "next/link";
import { ArrowRight, BookOpen, TrendingUp, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PostCard } from "@/components/PostCard";

export default async function HomePage() {
  const [featuredPosts, recentPosts, totalPosts] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { views: "desc" },
      take: 3,
      include: { tags: true },
    }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 6,
      include: { tags: true },
    }),
    prisma.post.count({ where: { published: true } }),
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/20 dark:via-slate-950 dark:to-violet-950/20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              欢迎来到我的博客
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-white bg-clip-text text-transparent mb-6">
              分享技术，记录生活
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              这里是一个专注于前端开发、技术探索和创意写作的个人博客。探索技术的边界，分享成长的点滴。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/posts"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5"
              >
                浏览文章
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                开始写作
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalPosts}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">篇文章</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900/30">
                <TrendingUp className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">1K+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">阅读量</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">24/7</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">持续更新</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">热门文章</h2>
                <p className="text-slate-600 dark:text-slate-400">最受欢迎的内容</p>
              </div>
              <Link
                href="/posts"
                className="hidden sm:inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-20 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">最新发布</h2>
                <p className="text-slate-600 dark:text-slate-400">探索最新的思考和见解</p>
              </div>
              <Link
                href="/posts"
                className="hidden sm:inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                查看全部
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center sm:hidden">
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
              >
                查看全部文章
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-6 py-16 sm:px-16 sm:py-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
            <div className="relative max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                准备好开始创作了吗？
              </h2>
              <p className="text-indigo-100 text-lg mb-8">
                无论是技术分享、生活感悟还是创意写作，这里都是你展示才华的舞台。
              </p>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-indigo-700 bg-white hover:bg-indigo-50 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                立即开始写作
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
