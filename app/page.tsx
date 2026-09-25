import { prisma } from "@/lib/prisma";
import { Status } from "@/app/generated/prisma/client";
import { createApplication, updateStatus } from "./actions";

export default async function Home() {
  const applications = await prisma.application.findMany({
    orderBy: { appliedDate: "desc" },
  });

  return (
    <main className="p-8">
      <h1 className="p-8 text-3xl font-bold">Job Tracker</h1>
      <form action={createApplication} className="mb-8 flex gap-2">
        <input
          name="company"
          placeholder="Company"
          required
          className="border rounded px-3 py-2"
        />
        <input
          name="position"
          placeholder="Position"
          required
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-black px-4 py-2 rounded text-white cursor-pointer transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
        >
          Add
        </button>
      </form>
      {applications.length === 0 ? (
        <p className="text-gray-500"> No applications found.</p>
      ) : (
        <ul className="space-y-3">
          {applications.map((app) => (
            <li key={app.id} className="border rounded-lg p-4">
              <p className="font-semibold">{app.company}</p>
              <p>{app.position}</p>
              <form action={updateStatus} className="mt-2 flex gap-2">
                <input type="hidden" name="id" value={app.id} />
                <select
                  key={app.status}
                  name="status"
                  defaultValue={app.status}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {Object.values(Status).map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="px-3 py-1 rounded border text-sm cursor-pointer transition-colors hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
                >
                  Save
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
