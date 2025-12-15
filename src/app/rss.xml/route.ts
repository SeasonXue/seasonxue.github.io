import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

function buildRssItem({
  title,
  summary,
  link,
  pubDate,
}: {
  title: string;
  summary: string;
  link: string;
  pubDate: string;
}) {
  return [
    "<item>",
    `<title><![CDATA[${title}]]></title>`,
    `<link>${link}</link>`,
    `<guid>${link}</guid>`,
    `<description><![CDATA[${summary}]]></description>`,
    `<pubDate>${pubDate}</pubDate>`,
    "</item>",
  ].join("");
}

function createRssXml(body: string) {
  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    '<rss version="2.0">',
    "<channel>",
    `<title><![CDATA[${siteConfig.title}]]></title>`,
    `<link>${siteConfig.url}</link>`,
    `<description><![CDATA[${siteConfig.description}]]></description>`,
    "<language>zh-CN</language>",
    `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    body,
    "</channel>",
    "</rss>",
  ].join("");
}

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map((post) =>
      buildRssItem({
        title: post.meta.title,
        summary: post.meta.summary,
        link: `${siteConfig.url}/blog/${post.slug}`,
        pubDate: new Date(post.meta.date).toUTCString(),
      }),
    )
    .join("");

  const rss = createRssXml(items);

  return new Response(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
