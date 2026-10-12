"use client";

import { useEffect } from "react";

export default function ListingError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="p-8">
      <h1 className="mb-2 text-3xl font-bold">Could not load listings</h1>
      <p className="mb-6 max-w-xl text-gray-600">
        One of the job sources did not respond. This is usually temporary.
      </p>
      <button
        onClick={() => retry()}
        className="bg-black px-4 py-2 rounded text-white cursos-pointer transition-colors hover:bg-zinc-800"
      >
        Try again
      </button>
    </main>
  );
}
