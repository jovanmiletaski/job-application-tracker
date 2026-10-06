import { Source } from "./sources";

type FeedItem = {
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

export async function fetchListings(source: Source): Promise<Listing[]> {
  const res = await fetch(source.url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`${source.name}: ${res.status} ${res.statusText}`);
  }

  const items = (await res.json()) as FeedItem[];
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
