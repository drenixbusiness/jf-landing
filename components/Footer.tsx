import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-grid">
        <div className="footer-brand">
          <a className="logo logo-footer" href="/" aria-label={`${site.shortName} — back to top`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/jf-logo-crop.svg" alt={site.name} width={596} height={259} loading="lazy" />
          </a>
          <p>Now hiring CDL-A drivers out of Nashville, TN.</p>
          <div className="footer-tags">
            <span className="tag-outline">{site.usdot}</span>
            <span className="tag-outline">{site.mc}</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Drivers</h4>
          <ul>
            <li><a href="/why">Why drive with us</a></li>
            <li><a href="/equipment">Equipment</a></li>
            <li><a href="/requirements">Requirements</a></li>
            <li><a href="/offer">Owner-operator offer</a></li>
            <li><a href="/apply">Apply now</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href={site.phoneHref}>{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a href={site.directionsUrl} target="_blank" rel="noopener">{site.addressLines[0]}<br />{site.addressLines[1]}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 {site.name}</p>
        <nav aria-label="Legal">
          <Link href="/terms">Terms and Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
