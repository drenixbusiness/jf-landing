import { EQUIPMENT, US_STATES, type Equipment } from "./site";

export type ApplyInput = {
  firstName: string;
  lastName: string;
  state: string;
  equipment: Equipment;
  phone: string;
  email: string;
  consent: boolean;
};

export type ApplyErrors = Partial<Record<keyof ApplyInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STATE_CODES = new Set(US_STATES.map(([code]) => code));

export function phoneDigits(phone: string) {
  const d = phone.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

// Shared by the form (per step) and the API route (whole payload).
export function validateStep1(q: Pick<ApplyInput, "firstName" | "lastName" | "state" | "equipment">): ApplyErrors {
  const e: ApplyErrors = {};
  if (q.firstName.trim().length < 2) e.firstName = "Enter your first name";
  if (q.lastName.trim().length < 2) e.lastName = "Enter your last name";
  if (!STATE_CODES.has(q.state)) e.state = "Choose a state";
  if (!EQUIPMENT.includes(q.equipment)) e.equipment = "Choose equipment";
  return e;
}

export function validateStep2(q: Pick<ApplyInput, "phone" | "email" | "consent">): ApplyErrors {
  const e: ApplyErrors = {};
  if (phoneDigits(q.phone).length !== 10) e.phone = "Enter a 10-digit phone number";
  if (!EMAIL_RE.test(q.email.trim())) e.email = "Enter a valid email";
  if (!q.consent) e.consent = "Please accept the Terms and Privacy Policy";
  return e;
}
