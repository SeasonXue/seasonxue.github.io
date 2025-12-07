import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seasonxue.github.io"),
  title: {
    default: "Season Xue · 纸张像素手记",
    template: "%s | Season Xue",
  },
  description:
    "Season 的轻盈纸张风格博客，记录创作、代码与生活灵感，并以像素彩蛋点缀。",
  openGraph: {
    title: "Season Xue · 纸张像素手记",
    description:
      "Season 的轻盈纸张风格博客，记录创作、代码与生活灵感，并以像素彩蛋点缀。",
    url: "https://seasonxue.github.io",
    siteName: "Season Xue",
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
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
