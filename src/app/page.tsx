import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

const formatBlogDate = (value: string) =>
  new Date(value).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default async function Home() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 6);
  const totalPosts = posts.length;
  const lastUpdated = posts[0]?.meta.date ? formatBlogDate(posts[0].meta.date) : "暂无";

  return (
    <div className="py-16">
      <main className="content-shell space-y-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.6em] text-(--ink-muted)">Latest</p>
            <h1 className="mt-2 text-3xl font-semibold leading-snug">
              最近写的内容
            </h1>
            <p className="mt-2 text-sm text-(--ink-muted)">
              共 {totalPosts} 篇 · 最近更新于 {lastUpdated}
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs uppercase tracking-[0.6em] text-(--ink-muted) hover:text-foreground"
          >
            查看全部 →
          </Link>
        </header>

        <section className="space-y-4">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl bg-white/80 px-6 py-5 shadow-[0_12px_30px_rgba(28,27,25,0.08)] backdrop-blur"
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
              <p className="mt-3 text-base font-medium text-(--ink-muted)">
                {post.meta.summary}
              </p>
            </article>
          ))}
          {latestPosts.length === 0 && (
            <p className="rounded-3xl bg-white/70 p-8 text-center text-sm text-(--ink-muted)">
              目前还没有文章，马上在 `content/posts` 中新增一个 `.mdx` 文件吧。
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
