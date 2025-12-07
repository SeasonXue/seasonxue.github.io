import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://seasonxue.github.io"),
  title: {
    default: "Season Xue · React + Tailwind SSG",
    template: "%s | Season Xue",
  },
  description:
    "Static Next.js + Tailwind CSS starter configured for automated GitHub Pages deployments.",
  openGraph: {
    title: "Season Xue · React + Tailwind SSG",
    description:
      "Static Next.js + Tailwind CSS starter configured for automated GitHub Pages deployments.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
