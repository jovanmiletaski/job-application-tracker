import { Source } from "./sources";

type SimplifyItem = {
  id: string;
  company_name: string;
  title: string;
  url: string;
  locations?: string[];
  category?: string;
  date_posted: number;
  active: boolean;
  is_visible?: boolean;
};

type GreenhouseJob = {
  id: number;
  title: string;
  absolute_url: string;
  location?: {
    name: string;
  };
  first_published?: string;
  updated_at?: string;
};

export type Listing = {
  source: string;
  externalId: string;
  company: string;
  position: string;
  url: string;
  location: string | null;
  category: string | null;
  postedAt: Date;
};

const MAX_AGE_DAYS = 7;

async function fetchSimplify(
  source: Extract<Source, { kind: "simplify" }>,
): Promise<Listing[]> {
  const res = await fetch(source.url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`${source.name}: ${res.status} ${res.statusText}`);
  }

  const items = (await res.json()) as SimplifyItem[];
  const cutoff = Date.now() / 1000 - MAX_AGE_DAYS * 24 * 60 * 60;

  return items
    .filter((item) => item.active && item.is_visible !== false)
    .filter((item) => item.date_posted > cutoff)
    .map((item) => ({
      source: source.name,
      externalId: item.id,
      company: item.company_name,
      position: item.title,
      url: item.url,
      location: item.locations?.[0] ?? null,
      category: item.category ?? null,
      postedAt: new Date(item.date_posted * 1000),
    }));
}

async function fetchGreenhouse(
  source: Extract<Source, { kind: "greenhouse" }>,
): Promise<Listing[]> {
  const res = await fetch(
    `https://boards-api.greenhouse.io/v1/boards/${source.board}/jobs?content=false`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`${source.name}: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as { jobs: GreenhouseJob[] };

  return data.jobs.map((job) => ({
    source: source.name,
    externalId: String(job.id),
    company: source.name,
    position: job.title,
    url: job.absolute_url,
    location: job.location?.name ?? null,
    category: null,
    postedAt: new Date(job.first_published ?? job.updated_at ?? 0),
  }));
}
export async function fetchListings(source: Source): Promise<Listing[]> {
  switch (source.kind) {
    case "simplify":
      return fetchSimplify(source);
    case "greenhouse":
      return fetchGreenhouse(source);
  }
}
