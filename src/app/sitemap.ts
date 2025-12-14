import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()

  const blogEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}/`,
    lastModified: new Date(post.meta.date),
  }))

  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/about/`, lastModified: new Date() },
    ...blogEntries,
  ]
}
