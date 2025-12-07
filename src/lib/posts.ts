import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  summary: string;
  date: string;
  tags?: string[];
};

export type Post = {
  slug: string;
  content: string;
  meta: PostFrontmatter;
};

async function readPostFile(slug: string) {
  const normalizedSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(POSTS_DIR, `${normalizedSlug}.mdx`);
  const file = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(file);
  return {
    slug: normalizedSlug,
    content,
    meta: data as PostFrontmatter,
  } satisfies Post;
}

export const getPostSlugs = cache(async () => {
  const files = await fs.readdir(POSTS_DIR);
  return files.filter((file) => file.endsWith(".mdx"));
});

export const getAllPosts = cache(async () => {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => readPostFile(slug)));
  return posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
});

export async function getPostBySlug(slug: string) {
  return readPostFile(slug);
}
