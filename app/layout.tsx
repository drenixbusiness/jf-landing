import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionRouter } from "@/components/SectionRouter";
import { site } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: ` ${site.shortName}`, template: `%s — ${site.shortName}` },
  description:
    "J Foster Trucking is hiring CDL-A drivers in Nashville, TN. Weekly pay, home time you can plan, well-kept trucks and a dispatcher who picks up. Apply in 2 minutes.",
};

export const viewport: Viewport = { themeColor: "#f5ead8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <Header />
        {children}
        <Footer />
        <SectionRouter />
      </body>
    </html>
  );
}
