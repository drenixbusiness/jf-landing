// Owner-operator offer — every number on /offer comes from here.
// PLACEHOLDER VALUES: confirm each one with J Foster before publishing.
export const offer = {
  weeklyGross: { min: 9000, max: 13000 },
  ratePerMile: { min: 2.5, max: 3.5, default: 2.75, step: 0.05 },
  weeklyMiles: { min: 2000, max: 5000, default: 3500, step: 100 },
  dispatchPercent: 12,
  // Flat weekly deductions shown in the pricing table and the calculator.
  fixedWeekly: [
    { label: "Insurance", amount: 400 },
    { label: "ELD", amount: 65 },
    { label: "IFTA and permits", amount: 35 },
  ],
  notCharged: [
    "No forced dispatch",
    "No trailer rental fee",
    "No escrow",
    "No hidden fees on your settlement",
  ],
};

export const usd = (n: number, digits = 0) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: digits, maximumFractionDigits: digits });
