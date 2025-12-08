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

  return (
    <div className="pb-16 pt-6">
      <main className="content-shell space-y-6">
        <section className="space-y-4">
          {posts.map((post) => (
            <article key={post.slug} className="frosted-panel px-6 py-5" aria-labelledby={`post-${post.slug}`}>
              <p className="text-[0.65rem] uppercase tracking-[0.4em] text-(--ink-muted)">
                {formatBlogDate(post.meta.date)}
              </p>
              <Link
                id={`post-${post.slug}`}
                href={`/blog/${post.slug}`}
                className="mt-2 block text-2xl font-semibold leading-snug text-(--ink)"
              >
                {post.meta.title}
              </Link>
              <p className="mt-2 text-base">{post.meta.summary}</p>
              {(post.meta.tags ?? []).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 text-[0.75rem] text-(--ink-muted)">
                  {post.meta.tags?.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-sm text-(--ink-muted)">目前还没有文章，马上在 `content/posts` 中新增一个 `.mdx` 文件吧。</p>
          )}
        </section>
      </main>
    </div>
  );
}
