import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} — Full truckload carrier`, template: `%s — ${site.shortName}` },
  description:
    "Dry van, reefer and flatbed capacity across the lower 48. One dispatcher, one phone number, live updates from pickup to delivery.",
};

export const viewport: Viewport = { themeColor: "#f5ead8" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
