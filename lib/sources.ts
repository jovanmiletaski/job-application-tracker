export type Source =
  | { kind: "simplify"; name: string; url: string }
  | { kind: "greenhouse"; name: string; board: string };

export const SOURCES: Source[] = [
  {
    kind: "simplify",
    name: "SimplifyJobs/New-Grad-Positions",
    url: "https://raw.githubusercontent.com/SimplifyJobs/New-Grad-Positions/dev/.github/scripts/listings.json",
  },
  {
    kind: "simplify",
    name: "SimplifyJobs/Summer2026-Internships",
    url: "https://raw.githubusercontent.com/SimplifyJobs/Summer2026-Internships/dev/.github/scripts/listings.json",
  },
  { kind: "greenhouse", name: "Stripe", board: "stripe" },
];
