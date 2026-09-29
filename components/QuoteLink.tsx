"use client";

import type { ReactNode } from "react";

// Smooth-scrolls to the quote card with a 24px offset. On pages without the
// card (Terms, Privacy) it falls through to a normal link to /#quote.
export function scrollToQuote() {
  const card = document.getElementById("quote");
  if (!card) return false;
  window.dispatchEvent(new Event("jf:close-menu"));
  const y = card.getBoundingClientRect().top + window.scrollY - 24;
  window.scrollTo({ top: y, behavior: "smooth" });
  return true;
}

export function QuoteLink({ className, children }: { className: string; children: ReactNode }) {
  return (
    <a
      className={className}
      href="/#quote"
      onClick={(e) => {
        if (scrollToQuote()) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
