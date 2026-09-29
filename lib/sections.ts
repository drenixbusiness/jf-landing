// Home-page sections that get their own clean URL (/requirements, /why, …).
// Each one is served by app/[section]/page.tsx and scrolled to on load.
export const SECTIONS = {
  why: "Why drive with us",
  equipment: "Equipment",
  requirements: "Driver requirements",
  contact: "Contact",
  apply: "Apply",
} as const;

export type SectionId = keyof typeof SECTIONS;

export const isSection = (s: string): s is SectionId => s in SECTIONS;
