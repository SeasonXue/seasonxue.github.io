export type Feature = {
  title: string;
  body: string;
  badge: string;
};

export type WorkflowStep = {
  title: string;
  items: string[];
};

export type ResourceLink = {
  label: string;
  href: string;
};

export const hero = {
  kicker: "Season 的纸张像素实验",
  title: "把想法写在明亮的纸面上",
  description:
    "内容保持像纸一样纯净，角落埋着像素风彩蛋。这里记录产品、写作与生活灵感，让技术性的文字也能散发手账质感。",
};

export const ctas: ResourceLink[] = [
  { label: "阅读最新日志", href: "/blog" },
  { label: "GitHub", href: "https://github.com/seasonxue" },
];

export const features: Feature[] = [
  {
    title: "纸张般的正文",
    badge: "Paper",
    body: "正文留白宽阔、字距舒展，模拟翻开一本新杂志的轻盈与克制。",
  },
  {
    title: "像素彩蛋",
    badge: "Pixels",
    body: "在标题、分隔与页脚植入马里奥配色的小型像素装饰，既怀旧又不过度喧闹。",
  },
  {
    title: "无噪音交互",
    badge: "Calm UI",
    body: "按钮描边、导航下划线和滚动动效都保持丝绸般的缓慢节奏，确保专注在内容。",
  },
];

export const workflow: WorkflowStep[] = [
  {
    title: "收集素材",
    items: [
      "随手把灵感写进 `/content/posts` 的 MDX。",
      "用 frontmatter 记录时间、标签与提要。",
    ],
  },
  {
    title: "排版打磨",
    items: [
      "在 `src/app` 调整组件、像素分隔以及卡片布局。",
      "主题变量集中在 `globals.css`，方便切换色彩与质感。",
    ],
  },
  {
    title: "发布分享",
    items: [
      "`pnpm run static` 导出静态站点。",
      "GitHub Actions 自动把新的纸张页面推送到 GitHub Pages。",
    ],
  },
];

export const stack: ResourceLink[] = [
  { label: "Next.js 16", href: "https://nextjs.org/docs" },
  { label: "React 19", href: "https://react.dev" },
  { label: "Tailwind CSS 4", href: "https://tailwindcss.com" },
  { label: "MDX 笔记", href: "/blog" },
];
