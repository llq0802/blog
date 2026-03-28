import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { PenLine, Eye, Trash2, Plus } from "lucide-react";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { tags: true },
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              文章管理
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              管理你的所有文章
            </p>
          </div>
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Plus className="w-5 h-5" />
            新建文章
          </Link>
        </div>

        {/* Posts Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    文章标题
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    状态
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    标签
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    阅读量
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    发布时间
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">
                        {post.title}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        /posts/{post.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.published
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                            : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {post.published ? "已发布" : "草稿"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
                          >
                            {tag.name}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-slate-400">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {post.views}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {post.publishedAt
                        ? formatDate(post.publishedAt)
                        : "未发布"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all"
                          title="编辑"
                        >
                          <PenLine className="w-4 h-4" />
                        </Link>
                        {post.published && (
                          <Link
                            href={`/posts/${post.slug}`}
                            target="_blank"
                            className="p-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-all"
                            title="查看"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <form
                          action={`/api/posts/${post.id}/delete`}
                          method="POST"
                          className="inline"
                        >
                          <button
                            type="submit"
                            className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all"
                            title="删除"
                            onClick={(e) => {
                              if (!confirm("确定要删除这篇文章吗？")) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                还没有文章
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                开始创作你的第一篇文章吧
              </p>
              <Link
                href="/admin/posts/new"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors"
              >
                <Plus className="w-5 h-5" />
                新建文章
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
