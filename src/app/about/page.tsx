export default function AboutPage() {
  return (
    <div className="pb-16 pt-6">
      <main className="content-shell space-y-8">
        <section className="px-8 py-10 sm:px-12" data-emphasis="high">
          <span className="section-label">About</span>
          <h1 className="mt-4 text-4xl font-semibold leading-snug text-(--ink)">👋 Hi, I&apos;m @SeasonXue</h1>
          <ul className="mt-4 list-none space-y-4 text-base">
            <li>👀 I&apos;m interested in JavaScript.</li>
            <li>🌱 I&apos;m currently learning AI ecosystem technologies.</li>
            <li>
              📫 How to reach me{' '}
              <a
                className="underline decoration-dotted decoration-(--ink-muted) underline-offset-4 transition hover:text-(--ink)"
                href="https://twitter.com/xue_season"
                target="_blank"
                rel="noreferrer"
              >
                @xue_season
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
