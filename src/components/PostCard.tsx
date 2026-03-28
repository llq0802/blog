import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Post, Tag } from "@prisma/client";

interface PostWithTags extends Post {
  tags: Tag[];
}

interface PostCardProps {
  post: PostWithTags;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/posts/${post.slug}`} className="absolute inset-0 z-10">
        <span className="sr-only">查看文章</span>
      </Link>
      
      {post.coverImage ? (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 flex items-center justify-center">
          <span className="text-6xl">📝</span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.publishedAt || post.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {post.views}
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
            阅读
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
