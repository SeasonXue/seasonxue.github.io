import type { Metadata } from "next";
import { HeaderNav } from "./HeaderNav";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seasonxue.github.io"),
  title: {
    default: "SeasonX · 博客",
    template: "%s | SeasonX",
  },
  description:
    "Season 的博客，记录创作、代码与生活灵感，并以像素彩蛋点缀。",
  openGraph: {
    title: "SeasonX · 博客",
    description:
      "Season 的博客，记录创作、代码与生活灵感，并以像素彩蛋点缀。",
    url: "https://seasonxue.github.io",
    siteName: "SeasonX",
  },
  twitter: {
    card: "summary_large_image",
    site: "@github",
    creator: "@github",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="zh-CN">
      <body className="bg-(--page-bg) text-(--ink) antialiased">
        <div className="flex min-h-screen flex-col pb-6 pt-4">
          <HeaderNav />
          <main className="flex-1 pb-4">{children}</main>
          <footer className="site-footer">
            <div className="content-shell site-footer__inner">
              <span>SeasonX · 博客</span>
              <span className="text-[0.78rem] uppercase tracking-[0.3em] text-(--ink-muted)">
                {currentYear}
              </span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
