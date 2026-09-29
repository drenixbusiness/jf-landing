import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icon";
import { EarningsCalculator } from "@/components/EarningsCalculator";
import { offer, usd } from "@/lib/offer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Owner-Operator Offer",
  description: `Lease on with ${site.shortName}: transparent weekly deductions, no forced dispatch and a dedicated dispatcher. Estimate your weekly earnings.`,
};

const benefits: { icon: IconName; tone: string; title: string; text: string }[] = [
  { icon: "shield-check", tone: "fi-accent", title: "No forced dispatch", text: "You choose the loads you run. Turning one down never costs you." },
  { icon: "phone", tone: "fi-sage", title: "A dedicated dispatcher", text: "One person who knows your truck, your lanes and when you need to be home." },
  { icon: "truck", tone: "fi-dark", title: "Pre-booked loads", text: "We line up your next load before you’re empty, so you spend less time waiting." },
  { icon: "clock", tone: "fi-peach", title: "24/7 support", text: "Someone answers day or night, weekends and holidays included." },
  { icon: "circle-dollar-sign", tone: "fi-accent", title: "Transparent settlements", text: "Every deduction is itemized. What you see on this page is what you pay." },
  { icon: "file-text", tone: "fi-sage", title: "Help with compliance", text: "We help with IFTA, permits and the paperwork that keeps you on the road." },
];

export default function Offer() {
  const fixedTotal = offer.fixedWeekly.reduce((s, f) => s + f.amount, 0);

  return (
    <main className="container">
      {/* Hero */}
      <section className="hero offer-hero" id="top">
        <div className="hero-bg photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1720811559395-3ed8d1b16649?fm=jpg&q=70&w=1800&auto=format&fit=crop" alt="" fetchPriority="high" />
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="badge"><span className="dot" />Owner-operator opportunity</span>
            <h1>
              <span>Your truck.</span>
              <span>Your loads.</span>
              <span className="hl">Up to ${offer.weeklyGross.max / 1000}K a week.</span>
            </h1>
            <p className="hero-lead">
              Lease on with {site.shortName} and keep more of every mile: flat, itemized deductions, no forced
              dispatch and a dispatcher who actually picks up.
            </p>
            <div className="btn-row">
              <a className="btn btn-primary" href="#calculator"><Icon name="calculator" />Calculate your earnings</a>
              <a className="btn btn-ghost-light" href={site.phoneHref}><Icon name="phone" />Call {site.phone}</a>
            </div>
          </div>

          <div className="offer-stats">
            <div className="offer-stat">
              <span>Weekly gross</span>
              <strong>{usd(offer.weeklyGross.min)}–{usd(offer.weeklyGross.max)}</strong>
            </div>
            <div className="offer-stat">
              <span>Rate per mile</span>
              <strong>{usd(offer.ratePerMile.min, 2)}–{usd(offer.ratePerMile.max, 2)}</strong>
            </div>
            <div className="offer-stat">
              <span>Dispatch fee</span>
              <strong>{offer.dispatchPercent}%</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <div className="section-head">
          <h2 className="h2">What it costs you</h2>
          <p className="muted">Straight numbers, every week. No surprises on your settlement.</p>
        </div>
        <div className="pricing">
          <div className="pricing-card">
            <h3>Weekly deductions</h3>
            <dl className="price-list">
              <div><dt>Dispatch fee</dt><dd>{offer.dispatchPercent}% of gross</dd></div>
              {offer.fixedWeekly.map((f) => (
                <div key={f.label}><dt>{f.label}</dt><dd>{usd(f.amount)}/week</dd></div>
              ))}
              <div className="price-total"><dt>Flat weekly total</dt><dd>{usd(fixedTotal)} + {offer.dispatchPercent}%</dd></div>
            </dl>
          </div>
          <div className="pricing-card pricing-free">
            <h3>What we don’t charge</h3>
            <ul className="checklist">
              {offer.notCharged.map((t) => (
                <li key={t}><span className="check"><Icon name="check" /></span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section" id="why">
        <div className="section-head">
          <h2 className="h2">Why owner-operators choose us</h2>
          <p className="muted">A small, owner-run fleet out of Nashville that treats your business like it matters.</p>
        </div>
        <div className="benefits-6">
          {benefits.map((f) => (
            <div className="feature" key={f.title}>
              <div className={`feature-icon ${f.tone}`}><Icon name={f.icon} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculator */}
      <section className="section" id="calculator">
        <div className="section-head">
          <h2 className="h2">Estimate your weekly earnings</h2>
          <p className="muted">Move the sliders to see gross, deductions and net for a typical week.</p>
        </div>
        <EarningsCalculator />
      </section>

      {/* CTA */}
      <section className="section" id="contact">
        <div className="cta">
          <h2 className="h2">Ready to lease on?</h2>
          <p>Call our recruiting line or send a quick application. We’ll go over the numbers with you, line by line.</p>
          <div className="btn-row">
            <a className="btn btn-dark" href={site.phoneHref}><Icon name="phone" />{site.phone}</a>
            <a className="btn btn-cream" href="/#apply">Apply now</a>
          </div>
        </div>
      </section>
    </main>
  );
}
