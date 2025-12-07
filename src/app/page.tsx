import Link from "next/link";
import { ctas, features, hero, stack, workflow } from "@/data/content";
import { getAllPosts } from "@/lib/posts";

const formatBlogDate = (value: string) =>
  new Date(value).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default async function Home() {
  const posts = await getAllPosts();
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="bg-slate-950 text-slate-50">
      <div className="relative isolate min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-x-1/2 top-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-sky-500/30 blur-[160px]" />
        <main className="mx-auto flex max-w-5xl flex-col gap-16 px-6 pb-24 pt-28 font-sans sm:px-10 lg:px-0">
          <header className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
              {hero.kicker}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {hero.title}
            </h1>
            <p className="text-lg leading-relaxed text-slate-300 sm:max-w-3xl">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {ctas.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-sky-300 hover:text-sky-200"
                  target="_blank"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </header>

          <section className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
                  {feature.badge}
                </span>
                <h2 className="mt-3 text-xl font-semibold text-white">
                  {feature.title}
                </h2>
                <p className="mt-3 text-sm text-slate-200">{feature.body}</p>
              </article>
            ))}
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur">
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              {stack.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  className="rounded-full border border-white/15 px-4 py-2 transition hover:border-sky-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Workflow
              </p>
              <h2 className="text-2xl font-semibold text-white">3 steps to ship</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {workflow.map((step) => (
                <article key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-200">
                    {step.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Blog
                </p>
                <h2 className="text-2xl font-semibold text-white">最新文章</h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-medium text-sky-300 transition hover:text-sky-200"
              >
                全部文章 →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {latestPosts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {formatBlogDate(post.meta.date)}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 block text-lg font-semibold text-white"
                  >
                    {post.meta.title}
                  </Link>
                  <p className="mt-2 text-sm text-slate-200">{post.meta.summary}</p>
                </article>
              ))}
              {latestPosts.length === 0 && (
                <p className="rounded-3xl border border-dashed border-white/20 p-6 text-center text-sm text-slate-300">
                  目前还没有文章，马上在 `content/posts` 中新增一个 `.mdx` 文件吧。
                </p>
              )}
            </div>
          </section>

          <footer className="border-t border-white/10 pt-6 text-sm text-slate-400">
            Built with ❤️ using Next.js, React, and Tailwind CSS. Customize `src/app/page.tsx` to make it yours.
          </footer>
        </main>
      </div>
    </div>
  );
}
