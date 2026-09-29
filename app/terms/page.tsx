import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function Terms() {
  return (
    <main className="container">
      <article className="legal">
        <div className="legal-card">
          <h1>Terms and Conditions</h1>
          <p className="updated">Last updated: {site.legalUpdated}</p>

          <p>
            These Terms and Conditions (“Terms”) govern your use of this website, operated by {site.name} (“we”,
            “us”, “our”). By using this site or submitting a quote request, you agree to these Terms. If you do not
            agree, please do not use the site.
          </p>

          <h2>1. Our services</h2>
          <p>
            We are a motor carrier providing full-truckload transportation (dry van, reefer and flatbed) operating
            under {site.usdot} and {site.mc}. This website provides information about our services and lets you
            request a freight quote.
          </p>

          <h2>2. Quote requests</h2>
          <p>
            A quote request submitted through this site is an inquiry only. It is not a binding offer, a tender of
            freight, or a contract of carriage. Any rate we give you is an estimate based on the information you
            provide and is subject to confirmation of lane, weight, dimensions, commodity, timing, equipment
            availability and accessorial requirements.
          </p>
          <p>
            A shipment is accepted only when we confirm it in writing (for example, a signed rate confirmation). The
            rate confirmation, bill of lading and any carrier agreement between us will govern that shipment.
          </p>

          <h2>3. Accuracy of information</h2>
          <p>
            You agree to provide accurate and complete information, including correct contact details and a truthful
            description of the freight. You must not submit a request on someone else’s behalf without their
            permission.
          </p>

          <h2>4. Communications consent</h2>
          <p>
            By submitting a quote request, you agree that we may contact you about your request by phone call, text
            message or email using the details you provide. Message and data rates may apply. Consent is not a
            condition of purchasing any service. You can opt out of text messages at any time by replying STOP, or
            by contacting us using the details below.
          </p>

          <h2>5. Liability for cargo</h2>
          <p>
            Loss of or damage to cargo is governed by the terms of the applicable bill of lading, rate confirmation
            and carrier agreement, and by applicable federal law, including 49 U.S.C. § 14706 (the Carmack
            Amendment). Coverage amounts described on this site are general information and do not replace the
            terms of those documents.
          </p>

          <h2>6. Website use</h2>
          <ul>
            <li>Do not use the site for any unlawful purpose or to send spam or automated submissions.</li>
            <li>Do not attempt to interfere with the site’s security or operation.</li>
            <li>Site content, text and the {site.shortName} logo belong to us and may not be copied without permission. Photos are used under their respective licenses.</li>
          </ul>

          <h2>7. Disclaimer</h2>
          <p>
            The site is provided “as is”. We try to keep the information current and accurate, but we do not
            guarantee that it is complete, error-free or always available. Transit times and on-time statistics are
            typical figures, not guarantees.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the fullest extent allowed by law, we are not liable for any indirect, incidental or consequential
            damages arising from your use of this website. This does not limit any liability we have under a
            shipment contract or that cannot be limited by law.
          </p>

          <h2>9. Privacy</h2>
          <p>
            Our <Link href="/privacy">Privacy Policy</Link> explains how we collect and use your information.
          </p>

          <h2>10. Changes</h2>
          <p>
            We may update these Terms from time to time. The “Last updated” date above shows when they last
            changed. Continued use of the site after a change means you accept the updated Terms.
          </p>

          <h2>11. Governing law</h2>
          <p>
            These Terms are governed by the laws of the State of [STATE], without regard to conflict-of-law rules,
            except where federal law applies.
          </p>

          <h2>12. Contact us</h2>
          <p>
            {site.name}<br />
            {site.address}<br />
            Phone: <a href={site.phoneHref}>{site.phone}</a><br />
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </article>
    </main>
  );
}
