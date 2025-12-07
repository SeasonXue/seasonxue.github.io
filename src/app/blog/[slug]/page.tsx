import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type {
  HTMLAttributes,
} from "react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import shell from "highlight.js/lib/languages/shell";
import json from "highlight.js/lib/languages/json";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("tsx", typescript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("bash", shell);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("json", json);

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
  pre: ({ className, ...rest }: HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...rest}
      className={cx(
        "mt-6 overflow-auto rounded-2xl bg-[#f6f8fa] p-4 text-sm text-[#1f2328] font-[SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace]",
        className,
      )}
    />
  ),
  code: ({ className, children, ...rest }: HTMLAttributes<HTMLElement>) => {
    const rawCode = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
    const language = (className ?? "").replace(/language-/, "").trim();

    let highlighted = rawCode;

    if (language && hljs.getLanguage(language)) {
      highlighted = hljs.highlight(rawCode, { language }).value;
    } else if (rawCode) {
      highlighted = hljs.highlightAuto(rawCode).value;
    }

    return (
      <code
        {...rest}
        className={cx(
          "hljs rounded bg-[#f6f8fa] px-1.5 py-0.5 text-[0.8125rem] font-[SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace]",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    );
  },
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
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.75rem] text-(--ink-muted)">
                {post.meta.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-(--accent-cloud)/80 px-2.5 py-0.5 text-[0.75rem] font-medium text-(--ink-muted)"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-(--accent-gold)" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </header>
          <div className="mt-10 prose prose-neutral max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>
    </div>
  );
}
