import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "博客",
  description: "使用 MDX 编写的静态博客文章列表",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="bg-slate-950 px-6 py-20 text-slate-50 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Blog</p>
          <h1 className="mt-3 text-4xl font-semibold">最新文章</h1>
          <p className="mt-4 text-slate-300">
            文章存放在 `content/posts` 下的 `.mdx` 文件中，提交后会在静态导出阶段自动生成。
          </p>
        </header>
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-sky-300"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {new Date(post.meta.date).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <Link href={`/blog/${post.slug}`} className="mt-3 block text-2xl font-semibold">
                {post.meta.title}
              </Link>
              <p className="mt-2 text-slate-200">{post.meta.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                {(post.meta.tags ?? []).map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="rounded-3xl border border-dashed border-white/20 p-8 text-center text-slate-300">
            目前还没有文章，马上在 `content/posts` 中新增一个 `.mdx` 文件吧。
          </p>
        )}
      </div>
    </div>
  );
}
