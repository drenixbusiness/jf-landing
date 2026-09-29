"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { ApplyLink } from "./ApplyLink";
import { site } from "@/lib/site";

const links = [
  { href: "/#why", label: "Why us" },
  { href: "/#equipment", label: "Equipment" },
  { href: "/#requirements", label: "Requirements" },
  { href: "/offer", label: "Owner-operators" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("jf:close-menu", close);
    return () => window.removeEventListener("jf:close-menu", close);
  }, []);

  return (
    <header className="site-header container">
      <div className="header-bar">
        <a className="logo" href="/#top" aria-label={`${site.shortName} — home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/jf-logo-crop.svg" alt={site.name} width={596} height={259} />
        </a>
        <nav className="nav-pill" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={site.phoneHref}>
            <Icon name="phone" />
            {site.phone}
          </a>
          <ApplyLink className="btn btn-primary">Apply now</ApplyLink>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>
      <nav className={`mobile-menu${open ? " open" : ""}`} id="mobile-menu" aria-label="Mobile">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href={site.phoneHref} onClick={() => setOpen(false)}>
          <Icon name="phone" />
          Call recruiting {site.phone}
        </a>
      </nav>
    </header>
  );
}
