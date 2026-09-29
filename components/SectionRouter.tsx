"use client";

import { useEffect } from "react";
import { isSection } from "@/lib/sections";

const OFFSET = 24;

export function scrollToId(id: string, smooth = true) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return false;
  window.dispatchEvent(new Event("jf:close-menu"));
  const top = id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - OFFSET;
  window.scrollTo({ top, behavior: smooth ? "smooth" : "instant" });
  return true;
}

const slugOf = (path: string) => path.replace(/^\/+|\/+$/g, "");

// Makes section links like /requirements scroll in place (no # in the URL),
// scrolls to the section when such a URL is opened directly, and keeps
// back/forward working. Plain #id links are scrolled without touching the URL.
export function SectionRouter() {
  useEffect(() => {
    const goToPath = (smooth: boolean) => {
      const slug = slugOf(location.pathname);
      if (isSection(slug)) scrollToId(slug, smooth);
    };

    // Direct visit to /requirements etc.: jump there, then again once fonts
    // have loaded in case the layout above shifted.
    goToPath(false);
    document.fonts?.ready.then(() => goToPath(false));

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;

      // In-page hash link (e.g. #calculator): scroll, keep the URL clean.
      if (url.pathname === location.pathname && url.hash) {
        if (scrollToId(url.hash.slice(1))) e.preventDefault();
        return;
      }

      // Section link (/requirements) or home (/): scroll if it's on this page.
      const slug = slugOf(url.pathname);
      const target = slug === "" ? "top" : slug;
      if ((slug === "" || isSection(slug)) && document.getElementById(slug === "" ? "top" : slug)) {
        e.preventDefault();
        if (url.pathname !== location.pathname) history.pushState(null, "", url.pathname);
        scrollToId(target);
      }
    };

    const onPop = () => {
      const slug = slugOf(location.pathname);
      if (slug === "") scrollToId("top");
      else goToPath(true);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  return null;
}
