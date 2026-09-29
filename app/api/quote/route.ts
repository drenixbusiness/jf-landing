import { NextResponse } from "next/server";
import { US_STATES } from "@/lib/site";
import { phoneDigits, validateStep1, validateStep2, type QuoteInput } from "@/lib/quote";

// Posts each quote request into a Telegram group.
// Needs TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID (see .env.example).

const str = (v: unknown, max = 120) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Spam trap. Browser autofill can fill it for real visitors too, so a filled
  // trap only flags the lead in the group — it never drops it.
  const trapped = !!str(body.hp_extra);
  if (trapped) console.warn("Quote form: spam-trap field was filled; sending flagged");

  const q: QuoteInput = {
    firstName: str(body.firstName, 60),
    lastName: str(body.lastName, 60),
    state: str(body.state, 2),
    equipment: str(body.equipment, 20) as QuoteInput["equipment"],
    phone: str(body.phone, 30),
    email: str(body.email, 120),
    consent: body.consent === true,
  };

  const errors = { ...validateStep1(q), ...validateStep2(q) };
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Validation failed", errors }, { status: 422 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Quote form: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const d = phoneDigits(q.phone);
  const stateName = US_STATES.find(([code]) => code === q.state)?.[1] ?? q.state;
  const text = [
    "🚚 <b>New quote request</b>",
    ...(trapped ? ["⚠️ <i>Possible spam (hidden field was filled)</i>"] : []),
    "",
    `<b>Name:</b> ${esc(q.firstName)} ${esc(q.lastName)}`,
    `<b>State:</b> ${esc(stateName)}`,
    `<b>Equipment:</b> ${esc(q.equipment)}`,
    `<b>Phone:</b> (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`,
    `<b>Email:</b> ${esc(q.email)}`,
    "",
    `<i>Consent to Terms/Privacy: yes · ${new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })} CT</i>`,
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    if (!res.ok) {
      console.error("Quote form: Telegram error", res.status, await res.text());
      return NextResponse.json({ error: "Send failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Quote form: Telegram request failed", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
