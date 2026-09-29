import type { ReactNode } from "react";

// Link to the application card. SectionRouter scrolls to it in place when the
// card is on the current page and shows /apply in the address bar.
export function ApplyLink({ className, children }: { className: string; children: ReactNode }) {
  return <a className={className} href="/apply">{children}</a>;
}
