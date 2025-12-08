import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
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
        "mt-8 overflow-auto rounded-2xl border border-white/15 bg-[rgba(28,27,25,0.95)] p-5 text-sm text-white/90 font-[SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace]",
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
          "hljs rounded bg-[rgba(236,245,255,0.2)] px-1.5 py-0.5 text-[0.8125rem] text-white font-[SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace]",
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

  if (!post) {
    notFound();
  }

  return (
    <div className="pb-20 pt-6 text-(--ink)">
      <article className="content-shell">
        <div className="paper-sheet">
          <div className="sheet-frontmatter space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 text-[0.7rem] uppercase tracking-[0.4em] text-(--ink-muted)">
              <span>
                {new Date(post.meta.date).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-2 text-(--ink)">
                <span className="h-2 w-2 rounded-full bg-(--accent-sun)" />
                frontmatter
              </span>
            </div>
            <header className="space-y-3">
              <h1 className="text-4xl font-semibold leading-snug text-(--ink)">{post.meta.title}</h1>
              <p className="text-lg text-(--ink-muted)">{post.meta.summary}</p>
              {(post.meta.tags ?? []).length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[0.75rem] text-(--ink-muted)">
                  {post.meta.tags?.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
          </div>
          <div className="sheet-body prose prose-neutral max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </div>
      </article>
    </div>
  );
}
