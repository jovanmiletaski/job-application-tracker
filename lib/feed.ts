import { Source } from "./sources";

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

type ArbeitnowJob = {
  slug: string;
  company_name: string;
  title: string;
  url: string;
  location?: string;
  remote?: boolean;
  created_at: number;
  tags?: string[];
};

async function fetchArbeitnow(
  source: Extract<Source, { kind: "arbeitnow" }>,
): Promise<Listing[]> {
  const res = await fetch("https://www.arbeitnow.com/api/job-board-api", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`${source.name}: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as { data: ArbeitnowJob[] };

  return data.data.map((job) => ({
    source: source.name,
    externalId: job.slug,
    company: job.company_name,
    position: job.title,
    url: job.url,
    location: job.remote ? "Remote" : (job.location ?? null),
    category: job.tags?.[0] ?? null,
    postedAt: new Date(job.created_at * 1000),
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

  const match = source.match;
  const jobs = match
    ? data.jobs.filter((job) => job.location?.name?.includes(match))
    : data.jobs;

  return jobs.map((job) => ({
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
    case "greenhouse":
      return fetchGreenhouse(source);
    case "arbeitnow":
      return fetchArbeitnow(source);
  }
}
