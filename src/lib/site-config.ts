/**
 * Site-wide configuration
 * 站点统一配置 - 修改域名只需更改此处
 */
export const siteConfig = {
  /** 站点基础 URL（不带尾部斜杠） */
  url: 'https://seasonxue.github.io',

  /** 站点名称 */
  name: 'SeasonX',

  /** 站点标题 */
  title: 'SeasonX · 博客',

  /** 站点描述 */
  description: 'Season 的博客，记录创作、代码与生活灵感。',

  /** 作者信息 */
  author: {
    name: 'SeasonXue',
    twitter: '@xue_season',
  },
} as const

export type SiteConfig = typeof siteConfig
