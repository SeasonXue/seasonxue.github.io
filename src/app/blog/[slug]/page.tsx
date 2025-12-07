import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type {
  HTMLAttributes,
  LiHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostSafe(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.summary,
  };
}

async function getPostSafe(slug: string) {
  try {
    return await getPostBySlug(slug);
  } catch {
    return null;
  }
}

const cx = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(" ");

const mdxComponents = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="mt-10 text-3xl font-semibold text-foreground" />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mt-4 text-base font-medium leading-8 text-(--ink-muted)" />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="mt-6 overflow-auto rounded-2xl border border-[#d0d7de] bg-[#f6f8fa] p-4 text-sm text-[#1f2328] font-[SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace]"
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="rounded border border-[#d0d7de] bg-[#f6f8fa] px-1.5 py-0.5 text-sm font-[SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace]"
    />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mt-4 list-disc space-y-2 pl-6 text-(--ink-muted)" />
  ),
  li: (props: LiHTMLAttributes<HTMLLIElement>) => <li {...props} className="leading-7" />,
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="mt-6 rounded-2xl bg-white/70 px-6 py-4 text-lg text-(--ink-muted) italic shadow-[0_12px_30px_rgba(28,27,25,0.06)]"
    />
  ),
  table: ({ className, children, ...rest }: HTMLAttributes<HTMLTableElement>) => (
    <div className="mt-8 overflow-x-auto rounded-[28px] bg-white/85 shadow-[0_18px_40px_rgba(28,27,25,0.08)]">
      <table
        {...rest}
        className={cx(
          "w-full min-w-[420px] border-collapse text-sm text-foreground",
          className,
        )}
      >
        {children}
      </table>
    </div>
  ),
  thead: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props} className={cx(props.className)} />
  ),
  tbody: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} className={cx("bg-white", props.className)} />
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props} className={cx("border-b border-[#f1e7d5]", props.className)} />
  ),
  th: ({ className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      {...rest}
      className={cx(
        "px-4 py-3 text-left text-xs uppercase tracking-[0.4em] text-(--ink-muted)",
        className,
      )}
    />
  ),
  td: ({ className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) => (
    <td {...rest} className={cx("px-4 py-3 align-top text-(--ink-muted)", className)} />
  ),
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostSafe(slug);
  const backLinkClasses =
    "inline-flex w-max items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-medium text-foreground shadow-[0_10px_24px_rgba(28,27,25,0.08)] transition hover:-translate-y-0.5";

  if (!post) {
    notFound();
  }

  return (
    <div className="py-16 text-foreground">
      <article className="content-shell space-y-8">
        <Link href="/blog" className={backLinkClasses}>
          <span aria-hidden>←</span>
          返回博客列表
        </Link>
        <div className="paper-panel px-8 py-10 sm:px-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="text-[0.75rem] uppercase tracking-[0.4em] text-(--ink-muted)">
              {new Date(post.meta.date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <header className="mt-6 space-y-2">
            <h1 className="text-4xl font-semibold leading-snug">{post.meta.title}</h1>
            <p className="text-lg font-medium text-(--ink-muted)">{post.meta.summary}</p>
            {(post.meta.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-(--ink-muted)">
                {post.meta.tags?.map((tag) => (
                  <span key={tag} className="rounded-full px-3 py-1 text-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          <div className="mt-10 space-y-6 text-base leading-8 text-(--ink-muted)">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>
    </div>
  );
}
