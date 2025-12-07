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
  kicker: "Season Xue",
  title: "Modern React + Tailwind static site for GitHub Pages",
  description:
    "Ready-to-deploy Next.js 16 project configured for full static export, GitHub Pages automation, and component-driven styling via Tailwind CSS v4.",
};

export const ctas: ResourceLink[] = [
  { label: "Edit Content", href: "https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts" },
  { label: "Tailwind v4 Intro", href: "https://tailwindcss.com/docs/installation" },
];

export const features: Feature[] = [
  {
    title: "Pure Static Export",
    badge: "SSG",
    body: "Next.js output mode is locked to `export`, producing an `out/` directory GitHub Pages can serve without a Node server.",
  },
  {
    title: "Tailwind 4-ready",
    badge: "Styling",
    body: "Zero-config Tailwind import keeps design tokens in CSS while utility classes power every section.",
  },
  {
    title: "Automated Deploys",
    badge: "CI/CD",
    body: "A GitHub Actions workflow builds, exports, and publishes the site to the `github-pages` environment on every push to `main`.",
  },
];

export const workflow: WorkflowStep[] = [
  {
    title: "Develop",
    items: [
      "Run `npm run dev` and edit any component under `src/app`.",
      "Use Tailwind utilities or extend tokens inside `globals.css`.",
    ],
  },
  {
    title: "Build",
    items: [
      "`npm run static` generates a production build and static export in `out/`.",
      "Preview locally with any static server (e.g. `npx serve out`).",
    ],
  },
  {
    title: "Deploy",
    items: [
      "Push to `main` to trigger the GitHub Pages workflow.",
      "Pages serves the latest artifact at https://seasonxue.github.io by default.",
    ],
  },
];

export const stack: ResourceLink[] = [
  { label: "Next.js 16", href: "https://nextjs.org/docs" },
  { label: "React 19", href: "https://react.dev" },
  { label: "Tailwind CSS 4", href: "https://tailwindcss.com" },
  { label: "GitHub Pages", href: "https://pages.github.com" },
];
