import Link from "next/link";
import { ctas, hero } from "@/data/content";
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
    <div className="py-16 text-foreground">
      <main className="content-shell flex flex-col gap-16">
        <section className="paper-panel px-8 py-14 sm:px-12">
          <div className="relative">
            <div className="relative z-10 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.6em] text-(--ink-muted)">{hero.kicker}</p>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-snug sm:text-5xl">
                  {hero.title}
                </h1>
                <p className="mt-4 max-w-3xl text-lg font-medium text-(--ink-muted)">{hero.description}</p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.4em]">
                {ctas.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-full bg-(--accent-cloud)/60 px-5 py-2 text-foreground transition hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-8 text-xs uppercase tracking-[0.4em] text-(--ink-muted)">
                <div>
                  <p>文章数量</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{totalPosts}</p>
                </div>
                <div>
                  <p>最近更新</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{lastUpdated}</p>
                </div>
                <div>
                  <p>技术栈</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">Next.js · MDX</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.6em] text-(--ink-muted)">Latest</p>
              <h2 className="text-2xl font-semibold">最近写的内容</h2>
            </div>
            <Link href="/blog" className="text-xs uppercase tracking-[0.6em] text-(--ink-muted)">
              查看全部 →
            </Link>
          </header>
          <div className="space-y-6">
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
          </div>
        </section>

        <section className="rounded-3xl bg-white/70 px-8 py-10 shadow-[0_12px_30px_rgba(28,27,25,0.08)] backdrop-blur">
          <h3 className="text-lg font-semibold text-foreground">关于本站</h3>
          <p className="mt-3 text-base font-medium text-(--ink-muted)">
            这是一个使用 Next.js 16 + MDX 构建的正式博客系统，所有文章都来自 `content/posts`。排版遵循纸张阅读的留白，
            只在必要之处加入像素风的彩蛋，保证内容是唯一主角。
          </p>
          <p className="mt-3 text-base font-medium text-(--ink-muted)">
            访问博客列表可以查看完整归档，或者 Fork 这个仓库，自定义主题搭建属于你的极简写作空间。
          </p>
        </section>

        <footer className="flex flex-col gap-4 pb-10 text-sm text-(--ink-muted)">
          <p>Built for quiet reading · {new Date().getFullYear()}</p>
          <p>写字、写代码、写生活碎片。如果你也喜欢这个主题，欢迎直接在 `src/app` 里继续创作。</p>
        </footer>
      </main>
    </div>
  );
}
