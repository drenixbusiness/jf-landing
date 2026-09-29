"use client";

import { useId, useState } from "react";
import { offer, usd } from "@/lib/offer";

function Slider({ label, value, min, max, step, format, onChange }: {
  label: string; value: number; min: number; max: number; step: number;
  format: (n: number) => string; onChange: (n: number) => void;
}) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="calc-slider">
      <div className="calc-slider-head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{format(value)}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${pct}%` } as React.CSSProperties}
      />
      <div className="calc-scale"><span>{format(min)}</span><span>{format(max)}</span></div>
    </div>
  );
}

export function EarningsCalculator() {
  const [miles, setMiles] = useState(offer.weeklyMiles.default);
  const [rate, setRate] = useState(offer.ratePerMile.default);

  const gross = miles * rate;
  const dispatch = gross * (offer.dispatchPercent / 100);
  const fixed = offer.fixedWeekly.reduce((s, f) => s + f.amount, 0);
  const net = Math.max(0, gross - dispatch - fixed);

  return (
    <div className="calc">
      <div className="calc-inputs">
        <Slider
          label="Miles per week"
          value={miles}
          {...offer.weeklyMiles}
          format={(n) => n.toLocaleString("en-US")}
          onChange={setMiles}
        />
        <Slider
          label="Rate per mile"
          value={rate}
          {...offer.ratePerMile}
          format={(n) => usd(n, 2)}
          onChange={setRate}
        />
        <p className="calc-note">Estimate before fuel. Actual pay depends on lanes, loads and your truck.</p>
      </div>

      <div className="calc-result" aria-live="polite">
        <div className="calc-net">
          <span>Estimated weekly net</span>
          <strong>{usd(net)}</strong>
          <small>before fuel</small>
        </div>
        <dl className="calc-lines">
          <div><dt>Gross ({miles.toLocaleString("en-US")} mi × {usd(rate, 2)})</dt><dd>{usd(gross)}</dd></div>
          <div><dt>Dispatch fee ({offer.dispatchPercent}%)</dt><dd>−{usd(dispatch)}</dd></div>
          {offer.fixedWeekly.map((f) => (
            <div key={f.label}><dt>{f.label}</dt><dd>−{usd(f.amount)}</dd></div>
          ))}
        </dl>
      </div>
    </div>
  );
}
