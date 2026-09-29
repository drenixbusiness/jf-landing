"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "./Icon";
import { StateSelect } from "./StateSelect";
import { EQUIPMENT, US_STATES, type Equipment } from "@/lib/site";
import { validateStep1, validateStep2, type QuoteErrors, type QuoteInput } from "@/lib/quote";

const empty: QuoteInput = {
  firstName: "", lastName: "", state: "",
  equipment: "Dry Van", phone: "", email: "", consent: false,
};

type TextField = "firstName" | "lastName" | "phone" | "email";

export function QuoteForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<QuoteInput>(empty);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const focusFirstError = (e: QuoteErrors) => {
    const key = Object.keys(e)[0];
    if (key) cardRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
  };

  const onStep1 = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validateStep1(data);
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError(e);
    setStep(2);
  };

  const onStep2 = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validateStep2(data);
    setErrors(e);
    if (Object.keys(e).length) return focusFirstError(e);

    setSending(true);
    setServerError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, hp_extra: honeypot.current?.value ?? "" }),
      });
      if (!res.ok) throw new Error();
      setStep(3);
    } catch {
      setServerError(`We couldn't send your request. Please try again or call dispatch.`);
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setData(empty);
    setErrors({});
    setServerError("");
    setStep(1);
  };

  const text = (name: TextField, label: string, placeholder: string, extra: Partial<React.InputHTMLAttributes<HTMLInputElement>> = {}) => (
    <Field id={`q-${name}`} label={label} error={errors[name]}>
      <input
        className="input"
        id={`q-${name}`}
        name={name}
        placeholder={placeholder}
        value={data[name]}
        onChange={(e) => set(name, e.target.value)}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `q-${name}-err` : undefined}
        {...extra}
      />
    </Field>
  );

  return (
    <div className="quote-card" id="quote" ref={cardRef}>
      <div className="quote-head">
        <h2>Quick quote</h2>
        <div className="progress" aria-hidden="true">
          {[1, 2, 3].map((n) => <span key={n} className={n <= step ? "done" : ""} />)}
        </div>
      </div>

      {step === 1 && (
        <form onSubmit={onStep1} noValidate>
          <div className="field-row">
            {text("firstName", "First name", "Jane", { autoComplete: "given-name" })}
            {text("lastName", "Last name", "Carter", { autoComplete: "family-name" })}
          </div>
          <Field id="q-state" label="State" error={errors.state}>
            <StateSelect
              id="q-state"
              name="state"
              value={data.state}
              onChange={(code) => set("state", code)}
              invalid={!!errors.state}
              describedBy={errors.state ? "q-state-err" : undefined}
            />
          </Field>
          <div className="field">
            <span className="label" id="q-eq-label">Equipment</span>
            <div className="segmented" role="radiogroup" aria-labelledby="q-eq-label">
              {EQUIPMENT.map((eq: Equipment) => (
                <button
                  key={eq}
                  type="button"
                  role="radio"
                  aria-checked={data.equipment === eq}
                  onClick={() => set("equipment", eq)}
                >
                  {eq}
                </button>
              ))}
            </div>
          </div>
          <button className="btn btn-primary btn-block" type="submit">Continue</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={onStep2} noValidate>
          <div className="summary">{data.firstName.trim()} {data.lastName.trim()} · {US_STATES.find(([c]) => c === data.state)?.[1]} · {data.equipment}</div>
          {text("phone", "Phone", "(555) 123-4567", { type: "tel", inputMode: "tel", autoComplete: "tel", autoFocus: true })}
          {text("email", "Email", "jane@company.com", { type: "email", autoComplete: "email" })}

          {/* Spam trap: hidden from people, bots tend to fill it. */}
          <input ref={honeypot} className="hp" name="hp_extra" tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore aria-hidden="true" />

          <div className="field">
            <label className="consent">
              <input
                type="checkbox"
                name="consent"
                checked={data.consent}
                onChange={(e) => set("consent", e.target.checked)}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? "q-consent-err" : undefined}
              />
              <span className="consent-box"><Icon name="check" /></span>
              <span className="consent-text" id="q-consent-text">
                I agree to the <Link href="/terms" target="_blank">Terms and Conditions</Link> and{" "}
                <Link href="/privacy" target="_blank">Privacy Policy</Link>, and to be contacted about this quote by
                phone, text or email.
              </span>
            </label>
            {errors.consent && <div className="error" id="q-consent-err" role="alert">{errors.consent}</div>}
          </div>

          {serverError && <div className="error error-box" role="alert">{serverError}</div>}

          <div className="step-actions">
            <button className="btn btn-secondary" type="button" onClick={() => setStep(1)} disabled={sending}>Back</button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={sending || !data.consent}
              title={data.consent ? undefined : "Please accept the Terms and Privacy Policy first"}
              aria-describedby={data.consent ? undefined : "q-consent-text"}
            >
              {sending ? "Sending…" : "Request my rate"}
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <div className="success" aria-live="polite">
          <div className="success-icon"><Icon name="check" /></div>
          <h3>Thanks, {data.firstName.trim()}.</h3>
          <p>Our dispatcher will call you within 30 minutes with your rate.</p>
          <button className="btn btn-secondary" type="button" onClick={reset}>Start a new quote</button>
        </div>
      )}
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <div className="error" id={`${id}-err`} role="alert">{error}</div>}
    </div>
  );
}
