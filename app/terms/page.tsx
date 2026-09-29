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
            “us”, “our”). By using this site or submitting an application, you agree to these Terms. If you do not
            agree, please do not use the site.
          </p>

          <h2>1. About us</h2>
          <p>
            We are a motor carrier operating under {site.usdot} and {site.mc}. This website provides information
            about driving for us and lets you send a short application to our recruiting team.
          </p>

          <h2>2. Applications</h2>
          <p>
            An application submitted through this site is an expression of interest only. It is not an offer of
            employment or of a contract, and submitting it does not guarantee an interview or a position.
            Information about pay, home time, equipment and routes on this site is general and may change; the
            details that apply to you will be confirmed in writing if we make you an offer.
          </p>
          <p>
            Any offer is conditional on meeting our hiring requirements and the qualification rules of the Federal
            Motor Carrier Safety Administration (FMCSA), which may include a full driver application, a
            motor-vehicle record review, verification of past employment, a DOT physical and pre-employment drug
            and alcohol testing. We will ask for your consent before running any such checks.
          </p>

          <h2>3. Accuracy of information</h2>
          <p>
            You agree to provide accurate and complete information, including correct contact details. You must not
            submit an application on someone else’s behalf without their permission.
          </p>

          <h2>4. Communications consent</h2>
          <p>
            By submitting an application, you agree that we may contact you about it by phone call, text message or
            email using the details you provide. Message and data rates may apply. Consent is not a condition of
            employment. You can opt out of text messages at any time by replying STOP, or by contacting us using the
            details below.
          </p>

          <h2>5. Equal opportunity</h2>
          <p>
            We consider all qualified applicants without regard to race, color, religion, sex, sexual orientation,
            gender identity, national origin, age, disability, veteran status or any other status protected by law.
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
            guarantee that it is complete, error-free or always available. Descriptions of pay, home time and
            equipment are general and not a guarantee of terms of employment.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the fullest extent allowed by law, we are not liable for any indirect, incidental or consequential
            damages arising from your use of this website. This does not limit any liability that cannot be
            limited by law.
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
