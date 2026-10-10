import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { syncListings, createFromListing } from "@/app/actions";
import { connection } from "next/server";
import { SubmitButton } from "@/app/components/submit-button";

export default async function ListingsPage() {
  await connection();

  const listings = await prisma.jobListing.findMany({
    orderBy: { postedAt: "desc" },
    take: 50,
  });

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          My Applications
        </Link>
      </div>

      <form action={syncListings} className="mb-6">
        <SubmitButton
          pendingText="Refreshing..."
          className="bg-black px-4 py-2 rounded text-white cursor-pointer transition-colors hover:bg-zinc-800"
        >
          Refresh Listings
        </SubmitButton>
      </form>

      {listings.length === 0 ? (
        <p className="text-gray-500">No listings yet. Click Refresh</p>
      ) : (
        <ul className="space-y-3">
          {listings.map((listing) => (
            <li key={listing.id} className="border rounded-lg p-4">
              <p className="font-semibold">{listing.company}</p>
              <p>{listing.position}</p>
              <p className="text-xs text-gray-400">{listing.source}</p>
              {listing.location && (
                <p className="text-sm text-gray-500">{listing.location}</p>
              )}
              <a
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Open Posting
              </a>

              {listing.applicationId ? (
                <p className="mt-2 text-sm text-green-600">Applied</p>
              ) : (
                <form action={createFromListing} className="mt-2">
                  <input type="hidden" name="id" value={listing.id} />
                  <SubmitButton
                    pendingText="Adding..."
                    className="px-3 py-1 rounded border text-sm cursor-pointer transition-colors hover:bg-zinc-100"
                  >
                    Add as application
                  </SubmitButton>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
