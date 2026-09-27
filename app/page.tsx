import { prisma } from "@/lib/prisma";
import { Status } from "@/app/generated/prisma/client";
import { createApplication, updateStatus, deleteApplication } from "./actions";

export default async function Home() {
  const applications = await prisma.application.findMany({
    orderBy: { appliedDate: "desc" },
  });

  return (
    <main className="p-8">
      <h1 className="p-8 text-3xl font-bold">Job Tracker</h1>
      <form action={createApplication} className="mb-8 grid gap-3 sm:grid-cols-2">
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
        <input
          name="jobUrl"
          type="url"
          placeholder="Job URL"
          className="border rounded px-3 py-2"
        />
        <input
          name="source"
          placeholder="Source (LinkedIn, GitHub...)"
          className="border rounded px-3 py-2"
        />
        <input
          name="location"
          placeholder="Location"
          className="border rounded px-3 py-2"
        />
        <input
          name="salary"
          placeholder="Salary"
          className="border rounded px-3 py-2"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          rows={3}
          className="border rounded px-3 py-2 sm:col-span-2"
        />
        <button
          type="submit"
          className="bg-black px-4 py-2 rounded text-white cursor-pointer transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none sm:col-span-2"
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
              {app.location && (<p className="text-sm text-gray-500">Location: {app.location}</p>)}
              {app.salary && (<p className="text-sm text-gray-500">Salary: {app.salary}</p>)}
              {app.source && (<p className="text-sm text-gray-500">Source: {app.source}</p>)}
              {app.jobUrl && (<a href = {app.jobUrl}
              target = "_blank"
              rel = "noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
              >Job Posting</a>)}
              {app.notes && (<p className="text-sm text-gray-500">Notes: {app.notes}</p>)}
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
                <button
                  type="submit"
                  formAction={deleteApplication}
                  className="px-3 py-1 rounded border text-sm cursor-pointer transition-colors hover:bg-red-100 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none"
                >
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
