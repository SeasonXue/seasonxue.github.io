# SeasonXue.github.io

基于 Next.js 16 + React 19 + Tailwind CSS v4 的静态站点模板，预设输出 `out/` 目录并通过 GitHub Pages 自动部署。文章内容使用 `.mdx` 文件维护，适合写博客或更新型内容。

## 技术栈

- Next.js App Router（`output: "export"`，可直接托管在 Pages）
- Tailwind CSS v4（在 `src/app/globals.css` 中一次性引入）
- pnpm 作为包管理器
- GitHub Actions 全自动部署流程

## 环境要求

- Node.js ≥ 20
- pnpm（已在 `packageManager` 字段中锁定版本，可通过 `corepack enable` 启用）

## 快速开始

```bash
pnpm install   # 安装依赖
pnpm dev       # http://localhost:3000
```

- 英雄区与首页文案：`src/data/content.ts`
- 样式与设计令牌：`src/app/globals.css`
- 首页布局：`src/app/page.tsx`

## 使用 MDX 撰写博客

1. 在 `content/posts` 中创建新的 `.mdx` 文件，例如 `my-post.mdx`。
2. 文件顶部使用 Frontmatter 提供 `title`、`summary`、`date`（ISO 字符串）与可选 `tags`。
3. 推送代码后，`/blog` 列表与 `/blog/[slug]` 详情页会自动包含这些文章，并在静态导出阶段一次性生成。

示例 Frontmatter：

```mdx
---
title: "新的部署实践"
summary: "记录如何在 GitHub Pages 上部署 Next.js 静态站点。"
date: "2025-12-07"
tags:
  - DevOps
  - Next.js
---

内容从这里开始……
```

## 构建与静态导出

```bash
pnpm static    # 等同 next build，输出到 out/
```

生成的 `out/` 即为需要部署的静态文件，可用 `npx serve out` 等静态服务器本地预览。

## GitHub Pages CI/CD

1. 推送到 `main` 分支。
2. `.github/workflows/deploy.yml` 中的工作流会：
   - 安装 pnpm & 依赖
   - 执行 `pnpm lint`、`pnpm build`
   - 上传 `out/` 目录为 Pages 工件
3. `deploy` 任务自动发布到 `github-pages` 环境，即 `https://seasonxue.github.io`。

确保仓库设置中的 **Pages → Build and deployment** 选择 “GitHub Actions”。

## 自定义建议

- 全站 SEO / OpenGraph：`src/app/layout.tsx`
- 首页节段或组件：`src/app/page.tsx`
- 新增页面：在 `src/app` 下创建新的目录（保持静态路由，以保证可导出）
- 自定义 MDX 组件：编辑 `src/app/blog/[slug]/page.tsx` 中的 `mdxComponents`

祝编码愉快！🚀
