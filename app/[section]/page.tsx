import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "../page";
import { SECTIONS, isSection } from "@/lib/sections";

// /why, /equipment, /requirements, /contact, /apply all render the home page;
// SectionRouter scrolls to the matching section.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  if (!isSection(section)) return {};
  return { title: SECTIONS[section], alternates: { canonical: "/" } };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  return <Home />;
}
