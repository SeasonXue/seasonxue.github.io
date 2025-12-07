 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
];

export function HeaderNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-30 pt-4 pb-3">
      <div className="content-shell flex justify-center">
        <div className="pointer-events-auto flex w-full max-w-xl items-center justify-between rounded-full border border-white/65 bg-white/65 px-4 py-2 shadow-[0_18px_40px_rgba(28,27,25,0.14)] backdrop-blur-xl">
          <Link
            href="/"
            className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-(--ink-muted) hover:text-foreground"
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-(--accent-sun) to-(--accent-gold) shadow-[0_8px_20px_rgba(245,173,66,0.55)]">
              <span className="h-2 w-2 rounded-full bg-white/95" />
            </span>
            <span>Season Xue</span>
          </Link>
          <nav className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em]">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "relative inline-flex items-center rounded-full px-3.5 py-1.5 transition-all duration-200",
                    active
                      ? "bg-gradient-to-br from-(--accent-sun) to-(--accent-gold) text-foreground shadow-[0_10px_28px_rgba(243,199,95,0.7)]"
                      : "text-(--ink-muted) hover:text-foreground hover:bg-white/70",
                  ].join(" ")}
                >
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
