"use client";

import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  useEffect(() => {
    // Highlight code blocks
    const loadHighlight = async () => {
      const hljs = (await import("highlight.js")).default;
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    };
    loadHighlight();
  }, [content]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700 dark:text-slate-300">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-700 dark:text-slate-300">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="ml-4">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-6 bg-slate-50 dark:bg-slate-800/50 rounded-r-lg italic text-slate-700 dark:text-slate-300">
            {children}
          </blockquote>
        ),
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              className="rounded-lg my-6"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded text-sm font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => <>{children}</>,
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="rounded-xl my-8 w-full"
            loading="lazy"
          />
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-slate-200 dark:border-slate-700">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-slate-50 dark:bg-slate-800">
            {children}
          </thead>
        ),
        th: ({ children }) => (
          <th className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold text-slate-900 dark:text-white">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-700 dark:text-slate-300">
            {children}
          </td>
        ),
        hr: () => (
          <hr className="my-8 border-slate-200 dark:border-slate-800" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
