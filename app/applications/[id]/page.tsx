import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { Status } from "@/app/generated/prisma/client";
import { updateApplication } from "@/app/actions";
import { SubmitButton } from "@/app/components/submit-button";

export default async function EditAppPage({
  params,
}: PageProps<"/applications/[id]">) {
  await connection();

  const { id } = await params;

  const application = await prisma.application.findUnique({ where: { id } });

  if (!application) {
    notFound();
  }

  return (
    <main className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit application</h1>
        <Link href="/" className="text-sm text-blue-600 hover:underline">
          Back to list
        </Link>
      </div>

      <form
        action={updateApplication}
        className="grid max-w-2xl gap-3 sm:grid-cols-2"
      >
        <input type="hidden" name="id" value={application.id} />
        <input
          name="company"
          defaultValue={application.company}
          required
          className="border rounded px-3 py-2"
        />
        <input
          name="position"
          defaultValue={application.position}
          required
          className="border rounded px-3 py-2"
        />
        <select
          name="status"
          defaultValue={application.status}
          className="border rounded px-3 py-2"
        >
          {Object.values(Status).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          name="source"
          defaultValue={application.source ?? ""}
          placeholder="Source"
          className="border rounded px-3 py-2"
        />

        <input
          name="jobUrl"
          defaultValue={application.jobUrl ?? ""}
          placeholder="Job URL"
          className="border rounded px-3 py-2"
        />

        <input
          name="location"
          defaultValue={application.location ?? ""}
          placeholder="Location"
          className="border rounded px-3 py-2"
        />

        <input
          name="salary"
          defaultValue={application.salary ?? ""}
          placeholder="Salary"
          className="border rounded px-3 py-2"
        />

        <textarea
          name="notes"
          defaultValue={application.notes ?? ""}
          placeholder="Notes"
          rows={4}
          className="border rounded px-3 py-2 sm:col-span-2"
        />

        <SubmitButton
          pendingText="Saving..."
          className="bg-black px-4 py-2 rounded text-white cursor-pointer transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          Save changes
        </SubmitButton>
      </form>
    </main>
  );
}
