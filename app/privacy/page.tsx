import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <main className="container">
      <article className="legal">
        <div className="legal-card">
          <h1>Privacy Policy</h1>
          <p className="updated">Last updated: {site.legalUpdated}</p>

          <p>
            This Privacy Policy explains how {site.name} (“we”, “us”, “our”) collects, uses and protects personal
            information when you visit this website or apply to drive with us.
          </p>

          <h2>1. Information we collect</h2>
          <p>When you submit the application form, we collect:</p>
          <ul>
            <li>First and last name</li>
            <li>State</li>
            <li>Equipment experience (dry van, reefer or flatbed)</li>
            <li>Phone number and email address</li>
          </ul>
          <p>
            If you move forward in hiring, we will ask for more information in a separate driver application (for
            example, your license and employment history), and we will tell you how that information is used at
            that time.
          </p>
          <p>
            Like most websites, our hosting provider may also record basic technical data such as your IP address,
            browser type and pages visited, for security and to keep the site running. We do not use advertising
            trackers on this site.
          </p>

          <h2>2. How we use it</h2>
          <ul>
            <li>To review your application and decide whether to move forward</li>
            <li>To contact you by phone, text or email about your application and open positions</li>
            <li>To run the qualification checks federal rules require for drivers, with your consent</li>
            <li>To keep hiring and regulatory records we are required to keep</li>
            <li>To protect the site against spam and abuse</li>
          </ul>

          <h2>3. How your request is delivered to our team</h2>
          <p>
            Applications are delivered to our recruiting team through a private internal messaging group (Telegram).
            Only our staff have access to it. Messaging and hosting providers process this data on our behalf to
            deliver the service.
          </p>

          <h2>4. Sharing</h2>
          <p>We do not sell or rent your personal information. We share it only:</p>
          <ul>
            <li>With service providers that help us run the site and our business (hosting, messaging, email)</li>
            <li>With screening providers (such as drug-testing labs or record-check services) if you move forward in hiring and consent to those checks</li>
            <li>When required by law, or to protect our rights, safety or property</li>
          </ul>

          <h2>5. Text messages</h2>
          <p>
            If you give us your phone number, we may text you about your application. Message and data rates
            may apply. Reply STOP to opt out at any time, or HELP for help. We do not share your mobile number or
            text-messaging consent with third parties for their marketing.
          </p>

          <h2>6. How long we keep it</h2>
          <p>
            We keep applications for as long as needed to review them and to maintain normal hiring records, and
            driver qualification records for as long as the law requires. We then delete or anonymize the data.
          </p>

          <h2>7. Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect your information. No method of
            transmission or storage is completely secure, so we cannot guarantee absolute security.
          </p>

          <h2>8. Your choices and rights</h2>
          <p>
            You can ask us to access, correct or delete the personal information we hold about you, or to stop
            contacting you, by emailing <a href={`mailto:${site.email}`}>{site.email}</a>. Depending on where you
            live (for example, California), you may have additional rights under state law. We will not
            discriminate against you for exercising them.
          </p>

          <h2>9. Children</h2>
          <p>This site is intended for businesses and adults. We do not knowingly collect information from children under 13.</p>

          <h2>10. Changes</h2>
          <p>
            We may update this policy from time to time. The “Last updated” date above shows when it last changed.
            See also our <Link href="/terms">Terms and Conditions</Link>.
          </p>

          <h2>11. Contact us</h2>
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
