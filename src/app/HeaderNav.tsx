"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
];

export function HeaderNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const navClassName = [
    "text-[0.68rem] font-semibold uppercase tracking-[0.3em]",
    "w-full flex-col gap-2",
    isMenuOpen ? "flex" : "hidden",
    "md:flex md:flex-1 md:flex-row md:items-center md:justify-end md:gap-1",
  ].join(" ");

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

          <button
            type="button"
            onClick={toggleMenu}
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-4 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-(--ink) shadow-[0_12px_28px_rgba(28,27,25,0.12)] transition-colors hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent-sun) md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="primary-nav"
          >
            <span>{isMenuOpen ? "close" : "menu"}</span>
            <span className="relative h-3 w-4" aria-hidden="true">
              <span
                className={[
                  "absolute left-0 top-0 block h-0.5 w-full rounded-full bg-(--ink) transition-transform duration-200 ease-out",
                  isMenuOpen ? "translate-y-[5px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 rounded-full bg-(--ink) transition-opacity duration-200 ease-out",
                  isMenuOpen ? "opacity-0" : "opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute bottom-0 left-0 block h-0.5 w-full rounded-full bg-(--ink) transition-transform duration-200 ease-out",
                  isMenuOpen ? "-translate-y-[5px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>

          <nav
            id="primary-nav"
            className={navClassName}
            aria-label="Primary navigation"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={[
                    "inline-flex w-full items-center justify-center rounded-full px-4 py-1.5 transition-colors md:w-auto",
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
