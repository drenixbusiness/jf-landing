// Placeholders the client will replace — every page reads from here.
export const site = {
  name: "J Foster Trucking Company LLC",
  shortName: "J Foster Trucking",
  phone: "(000) 000-0000",
  phoneHref: "tel:+10000000000",
  email: "dispatch@jfostertrucking.com",
  address: "5380 Hickory Hollow Pkwy, Suite 200, Antioch, TN 37013",
  addressLines: ["5380 Hickory Hollow Pkwy, Suite 200", "Antioch, TN 37013"],
  // Map pin (US Census geocoder match for the street address).
  geo: { lat: 36.04497, lng: -86.65189 },
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=5380+Hickory+Hollow+Pkwy+Suite+200,+Antioch,+TN+37013",
  usdot: "USDOT 1301253",
  mc: "MC 504929",
  stats: [
    { value: "Weekly", label: "Pay, direct deposit" },
    { value: "48", label: "States we run" },
    { value: "24/7", label: "Dispatch support" },
  ],
  // Driver requirements — confirm these with the safety/hiring team.
  requirements: [
    "Valid Class A CDL",
    "At least 21 years old",
    "Clean driving record (MVR)",
    "Able to pass a DOT physical and drug screen",
  ],
  legalUpdated: "September 29, 2026",
};

export const EQUIPMENT = ["Dry Van", "Reefer", "Flatbed"] as const;
export type Equipment = (typeof EQUIPMENT)[number];

export const US_STATES: [string, string][] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"],
  ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"],
  ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"],
  ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"],
  ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"],
  ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"],
  ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"], ["OR", "Oregon"],
  ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"], ["SD", "South Dakota"],
  ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"],
  ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];
