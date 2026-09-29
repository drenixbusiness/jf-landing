import { Icon, type IconName } from "@/components/Icon";
import { ApplyForm } from "@/components/ApplyForm";
import { ApplyLink } from "@/components/ApplyLink";
import { OfficeMap } from "@/components/OfficeMap";
import { site } from "@/lib/site";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?fm=jpg&q=70&w=1800&auto=format&fit=crop`;

// Unsplash License photos: attribution is optional, so no on-image credit.
function Photo({ id, alt, priority }: { id: string; alt: string; priority?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={unsplash(id)} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />;
}

const equipment = [
  { title: "Dry Van", bg: "bg-surface", text: "53′ trailers hauling palletized, boxed and general freight across the lower 48.",
    photo: { id: "photo-1720811559395-3ed8d1b16649", alt: "Dry van semi-trailer on the highway" } },
  { title: "Reefer", bg: "bg-sage", text: "Temperature-controlled loads, with reefer units we keep maintained so you’re not fighting the equipment.",
    photo: { id: "photo-1711942179703-fce59b6afac6", alt: "Refrigerated trailer truck" } },
  { title: "Flatbed", bg: "bg-accent", text: "Steel, lumber, machinery and building materials. Tarps, chains and straps on every truck.",
    photo: { id: "photo-1686246668933-7425658394b0", alt: "Flatbed truck hauling materials" } },
];

const benefits: { icon: IconName; tone: string; title: string; text: string }[] = [
  { icon: "circle-dollar-sign", tone: "fi-accent", title: "Weekly pay", text: "Paid every week by direct deposit, with settlements you can actually read." },
  { icon: "shield-check", tone: "fi-dark", title: "Fully insured", text: "$1M auto liability and $250K cargo coverage on every load." },
  { icon: "truck", tone: "fi-dark", title: "Well-kept trucks", text: "Late-model equipment, maintained in the shop — not patched on the side of the road." },
  { icon: "phone", tone: "fi-peach", title: "A dispatcher who picks up", text: "Real people answer 24/7, and they know you by name." },
];

const steps = [
  { title: "Apply in 2 minutes", text: "Send your name, state, equipment experience and how to reach you." },
  { title: "Talk to recruiting", text: "We call you to go over the job, the pay, your home time and any questions." },
  { title: "Orientation and your first load", text: "Finish the required DOT paperwork, meet the team and get rolling." },
];

export default function Home() {
  return (
    <main className="container">
      {/* Hero */}
      <section className="hero" id="top">
        <div className="hero-bg photo">
          <Photo id="photo-1635061284178-76be4e6c2265" alt="" priority />
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="badge"><span className="dot" />Now hiring CDL-A drivers</span>
            <h1>
              <span>Drive for us.</span>
              <span>Get paid weekly.</span>
              <span className="hl">Get home.</span>
            </h1>
            <p className="hero-lead">
              J Foster Trucking is a small, owner-run fleet out of Nashville, TN. Dry van, reefer and flatbed runs
              across the lower 48, and a team that treats drivers like people.
            </p>
            <div className="btn-row">
              <ApplyLink className="btn btn-primary">Apply in 2 minutes <Icon name="arrow-right" /></ApplyLink>
              <a className="btn btn-ghost-light" href="/requirements">See requirements</a>
            </div>
          </div>
          <ApplyForm />
        </div>
      </section>

      {/* Highlights */}
      <div className="trust">
        <div className="stats">
          {site.stats.map((s) => (
            <div className="stat" key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>
          ))}
        </div>
        <div className="tags">
          <span className="tag-outline">{site.usdot}</span>
          <span className="tag-outline">{site.mc}</span>
        </div>
      </div>

      {/* Why drive with us */}
      <section className="section" id="why">
        <div className="why">
          <div className="why-intro">
            <h2 className="h2">Why drivers stay with us</h2>
            <p className="muted">We are a small, owner-run fleet. You talk to the same people every time, and they have your back on the road.</p>
            <ApplyLink className="btn btn-primary">Apply now</ApplyLink>
          </div>
          <div className="feature-grid">
            {benefits.map((f) => (
              <div className="feature" key={f.title}>
                <div className={`feature-icon ${f.tone}`}><Icon name={f.icon} /></div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="section" id="equipment">
        <div className="section-head">
          <h2 className="h2">What you’ll haul</h2>
          <p className="muted">Full truckload freight on our own trucks. Tell us what you’ve run before and we’ll match you to the right seat.</p>
        </div>
        <div className="cards-3">
          {equipment.map((s) => (
            <article className={`service-card ${s.bg}`} key={s.title}>
              <div className="photo"><Photo {...s.photo} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How hiring works */}
      <section className="section" aria-labelledby="steps-title">
        <div className="section-head">
          <h2 className="h2" id="steps-title">How hiring works</h2>
          <p className="muted">No long forms up front. Start with the basics and we take it from there.</p>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li className="step-card" key={s.title}>
              <span className="step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Requirements */}
      <section className="section" id="requirements">
        <div className="careers">
          <div className="careers-text">
            <span className="tag-accent">Requirements</span>
            <h2 className="h2">What you need to drive with us</h2>
            <p>If you check these boxes, we want to hear from you.</p>
            <ul className="checklist">
              {site.requirements.map((t) => (
                <li key={t}><span className="check"><Icon name="check" /></span>{t}</li>
              ))}
            </ul>
            <div className="btn-row">
              <ApplyLink className="btn btn-primary">Apply now</ApplyLink>
              <a className="btn btn-ghost-light" href={site.phoneHref}><Icon name="phone" />Call recruiting</a>
            </div>
          </div>
          <div className="photo">
            <Photo id="photo-1783428673235-77dafc15eb59" alt="Truck driver on the road" />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section" id="contact">
        <div className="cta">
          <h2 className="h2">Ready to drive with J Foster?</h2>
          <p>Apply in two minutes or call our recruiting line. We’ll walk you through the job, the pay and the home time.</p>
          <div className="btn-row">
            <a className="btn btn-dark" href={site.phoneHref}><Icon name="phone" />{site.phone}</a>
            <ApplyLink className="btn btn-cream">Apply now</ApplyLink>
          </div>
        </div>

        <div className="location">
          <div className="location-info">
            <h2>Visit us in Nashville</h2>
            <p className="muted">Our office is in Antioch, just off I‑24. Stop by, or call ahead and we’ll set up a time to meet.</p>
            <ul className="location-list">
              <li>
                <span className="feature-icon fi-accent"><Icon name="map-pin" /></span>
                <address>
                  <strong>Office</strong>
                  {site.addressLines.map((l) => <span key={l}>{l}</span>)}
                </address>
              </li>
              <li>
                <span className="feature-icon fi-sage"><Icon name="phone" /></span>
                <div><strong>Recruiting</strong><a href={site.phoneHref}>{site.phone}</a></div>
              </li>
              <li>
                <span className="feature-icon fi-dark"><Icon name="mail" /></span>
                <div><strong>Email</strong><a href={`mailto:${site.email}`}>{site.email}</a></div>
              </li>
            </ul>
            <a className="btn btn-primary" href={site.directionsUrl} target="_blank" rel="noopener">
              <Icon name="navigation" />Get directions
            </a>
          </div>
          <OfficeMap />
        </div>
      </section>
    </main>
  );
}
