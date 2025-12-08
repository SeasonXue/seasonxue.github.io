"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
];

export function HeaderNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-30 pb-3 pt-4">
      <div className="content-shell">
        <div className="frosted-panel flex flex-wrap items-center gap-3 rounded-[999px] px-5 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-(--ink-muted) transition-colors hover:text-(--ink)"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-white/55 text-[0.65rem] shadow-[0_10px_24px_rgba(28,27,25,0.2)]">
              <span className="h-2 w-2 rounded-full bg-(--accent-sun) shadow-[0_0_10px_rgba(245,173,66,0.6)]" />
            </span>
            <span>Season 的博客</span>
          </Link>

          <nav className="flex flex-1 items-center justify-end gap-1 text-[0.68rem] font-semibold uppercase tracking-[0.3em]">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "inline-flex items-center rounded-full px-4 py-1.5 transition-colors",
                    active
                      ? "bg-(--accent-sun) text-white shadow-[0_8px_22px_rgba(224,122,95,0.35)]"
                      : "text-(--ink-muted) hover:text-(--ink)",
                  ].join(" ")}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
