"use client";

import { useState, useRef } from "react";

export function CopyButton() {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCopy = async () => {
    // Find the code element sibling
    const container = buttonRef.current?.parentElement;
    if (!container) return;

    // The text is inside the pre > code element.
    // Container is the div wrapper.
    const pre = container.querySelector("pre");
    if (!pre) return;

    const text = pre.innerText || pre.textContent || "";

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleCopy}
      aria-label="Copy code"
      className="absolute top-4 right-4 rounded-md p-1.5 text-white/50 transition-all hover:bg-white/10 hover:text-white focus:outline-none opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
}
