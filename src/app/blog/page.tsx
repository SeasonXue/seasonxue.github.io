import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "纸张日志",
  description: "Season 的纸张 + 像素主题下的所有写作与灵感记录。",
};

const formatBlogDate = (value: string) =>
  new Date(value).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default async function BlogPage() {
  const posts = await getAllPosts();
  const backLinkClasses =
    "inline-flex w-max items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-foreground shadow-[0_10px_24px_rgba(28,27,25,0.08)] transition hover:-translate-y-0.5";

  return (
    <div className="py-16 text-foreground">
      <div className="content-shell space-y-10">
        <Link href="/" className={backLinkClasses}>
          <span aria-hidden>←</span>
          返回首页
        </Link>
        <header className="paper-panel px-8 py-10">
          <p className="text-xs uppercase tracking-[0.6em] text-(--ink-muted)">Blog</p>
          <h1 className="mt-4 text-3xl font-semibold">纸张里的最新文章</h1>
          <p className="mt-3 max-w-2xl text-(--ink-muted)">
            文章存放在 `content/posts` 下的 `.mdx` 文件里。写完之后运行 `pnpm run static` 即可导出新的静态页面。
          </p>
        </header>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl bg-white/75 px-6 py-6 shadow-[0_12px_30px_rgba(28,27,25,0.08)] backdrop-blur"
            >
              <p className="text-[0.75rem] uppercase tracking-[0.4em] text-(--ink-muted)">
                {formatBlogDate(post.meta.date)}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-2 block text-2xl font-semibold leading-snug text-foreground"
              >
                {post.meta.title}
              </Link>
              <p className="mt-3 text-base font-medium text-(--ink-muted)">{post.meta.summary}</p>
              {(post.meta.tags ?? []).length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-(--ink-muted)">
                  {post.meta.tags?.map((tag) => (
                    <span key={tag} className="rounded-full px-3 py-1 text-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="rounded-3xl bg-white/70 p-8 text-center text-sm text-(--ink-muted)">
            目前还没有文章，马上在 `content/posts` 中新增一个 `.mdx` 文件吧。
          </p>
        )}
      </div>
    </div>
  );
}
