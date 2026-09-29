import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="logo logo-footer" href="/#top" aria-label={`${site.shortName} — back to top`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/jf-logo.svg" alt={site.name} width={184} height={185} loading="lazy" />
          </a>
          <p>© 2026 {site.name}</p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#why">Why us</a></li>
            <li><a href="/#careers">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={site.phoneHref}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a href={site.directionsUrl} target="_blank" rel="noopener">{site.addressLines[0]}<br />{site.addressLines[1]}</a></li>
          </ul>
        </div>
        <div>
          <h4>Authority</h4>
          <ul>
            <li>{site.usdot}</li>
            <li>{site.mc}</li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><Link href="/terms">Terms and Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
