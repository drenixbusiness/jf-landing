"use client";

import type { ReactNode } from "react";

// Smooth-scrolls to the application card with a 24px offset. On pages without
// the card (Terms, Privacy) it falls through to a normal link to /#apply.
export function scrollToApply() {
  const card = document.getElementById("apply");
  if (!card) return false;
  window.dispatchEvent(new Event("jf:close-menu"));
  const y = card.getBoundingClientRect().top + window.scrollY - 24;
  window.scrollTo({ top: y, behavior: "smooth" });
  return true;
}

export function ApplyLink({ className, children }: { className: string; children: ReactNode }) {
  return (
    <a
      className={className}
      href="/#apply"
      onClick={(e) => {
        if (scrollToApply()) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
