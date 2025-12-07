export default function AboutPage() {
  return (
    <div className="py-16">
      <main className="content-shell">
        <section className="paper-panel px-8 py-10 sm:px-12">
          <h1 className="text-3xl font-semibold leading-snug">About</h1>
          <p className="mt-4 text-base font-medium text-(--ink-muted)">
            这里是 Season Xue 的个人写作空间，记录关于产品、设计、代码与生活的轻盈笔记。
          </p>
          <p className="mt-3 text-base font-medium text-(--ink-muted)">
            博客基于 Next.js 16 与 MDX 构建，并通过 GitHub Pages 部署，专注于舒适的阅读体验。
          </p>
        </section>
      </main>
    </div>
  );
}

