import { Icon, type IconName } from "@/components/Icon";
import { QuoteForm } from "@/components/QuoteForm";
import { QuoteLink } from "@/components/QuoteLink";
import { OfficeMap } from "@/components/OfficeMap";
import { site } from "@/lib/site";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?fm=jpg&q=70&w=1800&auto=format&fit=crop`;

// Unsplash License photos: attribution is optional, so no on-image credit.
function Photo({ id, alt, priority }: { id: string; alt: string; priority?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={unsplash(id)} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />;
}

const services = [
  { title: "Dry Van", bg: "bg-surface", text: "53′ trailers for palletized, boxed and general freight. Up to 45,000 lbs.",
    photo: { id: "photo-1720811559395-3ed8d1b16649", alt: "Dry van semi-trailer on the highway" } },
  { title: "Reefer", bg: "bg-sage", text: "Temperature-controlled loads from −20°F to 70°F, with continuous reefer monitoring.",
    photo: { id: "photo-1711942179703-fce59b6afac6", alt: "Refrigerated trailer truck" } },
  { title: "Flatbed", bg: "bg-accent", text: "Steel, lumber, machinery and building materials. Tarps, chains and straps on every truck.",
    photo: { id: "photo-1686246668933-7425658394b0", alt: "Flatbed truck hauling materials" } },
];

const features: { icon: IconName; tone: string; title: string; text: string }[] = [
  { icon: "clock", tone: "fi-accent", title: "24/7 dispatch", text: "A real person answers at 3 a.m. on a Sunday." },
  { icon: "map-pin", tone: "fi-sage", title: "Live GPS tracking", text: "A tracking link for every load, updated every few minutes." },
  { icon: "shield-check", tone: "fi-dark", title: "Fully insured", text: "$1M auto liability and $100K cargo coverage on every load." },
  { icon: "circle-dollar-sign", tone: "fi-peach", title: "Straight pricing", text: "The rate we quote is the rate you pay. No surprise fees." },
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
          <div>
            <span className="badge"><span className="dot" />Dispatch open 24/7</span>
            <h1>
              <span>Your freight.</span>
              <span>On time.</span>
              <span className="hl">Every mile.</span>
            </h1>
            <p className="hero-lead">
              Dry van, reefer and flatbed capacity across the lower 48. One dispatcher, one phone number, live updates
              from pickup to delivery.
            </p>
            <div className="btn-row">
              <QuoteLink className="btn btn-primary">Get a free quote <Icon name="arrow-right" /></QuoteLink>
              <a className="btn btn-ghost-light" href="#careers">Drive with us</a>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      {/* Trust strip */}
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

      {/* Services */}
      <section className="section" id="services">
        <div className="section-head">
          <h2 className="h2">What we haul</h2>
          <p className="muted">Full truckload for shippers and brokers. Our own trucks, our own drivers, no double brokering.</p>
        </div>
        <div className="cards-3">
          {services.map((s) => (
            <article className={`service-card ${s.bg}`} key={s.title}>
              <div className="photo"><Photo {...s.photo} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="section" id="why">
        <div className="why">
          <div className="why-intro">
            <h2 className="h2">Why shippers stay with us</h2>
            <p className="muted">We are a small, owner-run fleet. You talk to the same people every time, and they know your freight.</p>
            <QuoteLink className="btn btn-primary">Get a free quote</QuoteLink>
          </div>
          <div className="feature-grid">
            {features.map((f) => (
              <div className="feature" key={f.title}>
                <div className={`feature-icon ${f.tone}`}><Icon name={f.icon} /></div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" aria-label="Testimonials">
        <div className="testimonials">
          <figure className="testimonial bg-sage">
            <blockquote>“They picked up a load we had given up on at 9 p.m. and delivered it before our receiver opened. That’s why they get our lanes.”</blockquote>
            <figcaption><strong>Logistics manager</strong>Regional food distributor, TX</figcaption>
          </figure>
          <figure className="testimonial bg-surface">
            <blockquote>“Clear updates, clean paperwork, and a driver who called ahead. Easy carrier to work with.”</blockquote>
            <figcaption><strong>Freight broker</strong>Chicago, IL</figcaption>
          </figure>
        </div>
      </section>

      {/* Careers */}
      <section className="section" id="careers">
        <div className="careers">
          <div className="careers-text">
            <span className="tag-accent">Now hiring</span>
            <h2 className="h2">CDL-A drivers wanted</h2>
            <p>Join a fleet that treats drivers like people. Good equipment, honest miles, and a dispatcher who picks up.</p>
            <ul className="checklist">
              {["Weekly pay, direct deposit", "Late-model trucks, well maintained", "Home time you can plan around"].map((t) => (
                <li key={t}><span className="check"><Icon name="check" /></span>{t}</li>
              ))}
            </ul>
            <div className="btn-row">
              <a className="btn btn-primary" href={`mailto:${site.email}?subject=CDL-A%20driver%20application`}>Apply now</a>
              <a className="btn btn-ghost-light" href={site.phoneHref}>Call recruiting</a>
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
          <h2 className="h2">Got a load ready to move?</h2>
          <p>Call dispatch or send the lane. We reply within 30 minutes, day or night.</p>
          <div className="btn-row">
            <a className="btn btn-dark" href={site.phoneHref}><Icon name="phone" />{site.phone}</a>
            <QuoteLink className="btn btn-cream">Get a quote</QuoteLink>
          </div>
        </div>

        <div className="location">
          <div className="location-info">
            <h2>Find us in Nashville</h2>
            <p className="muted">Our office and dispatch desk are in Antioch, just off I-24.</p>
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
                <div><strong>Dispatch</strong><a href={site.phoneHref}>{site.phone}</a></div>
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
