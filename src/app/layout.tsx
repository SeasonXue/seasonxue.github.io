import type { Metadata } from "next";
import { HeaderNav } from "./HeaderNav";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.author.twitter,
    creator: siteConfig.author.twitter,
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
