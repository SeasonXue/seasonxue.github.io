import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { HTMLAttributes, LiHTMLAttributes } from "react";
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

const mdxComponents = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="mt-10 text-3xl font-semibold text-white" />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mt-4 leading-7 text-slate-200" />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="mt-6 overflow-auto rounded-2xl border border-white/10 bg-slate-900 p-4 text-sm"
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code {...props} className="rounded bg-slate-900 px-1 py-0.5 text-sm" />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mt-4 list-disc space-y-2 pl-6 text-slate-200" />
  ),
  li: (props: LiHTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-7" />
  ),
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostSafe(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-slate-950 px-6 py-20 text-slate-50 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm text-slate-400 hover:text-slate-200">
          ← 返回博客列表
        </Link>
        <header className="mt-6 space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {new Date(post.meta.date).toLocaleDateString("zh-CN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-4xl font-semibold text-white">{post.meta.title}</h1>
          <p className="text-lg text-slate-300">{post.meta.summary}</p>
        </header>
        <div className="mt-10 space-y-6">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
