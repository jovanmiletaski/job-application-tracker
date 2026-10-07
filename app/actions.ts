"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Status } from "@/app/generated/prisma/client";
import { SOURCES } from "@/lib/sources";
import { fetchListings } from "@/lib/feed";

export async function createApplication(formData: FormData) {
  const company = formData.get("company") as string;
  const position = formData.get("position") as string;
  const jobUrl = formData.get("jobUrl") as string;
  const source = formData.get("source") as string;
  const location = formData.get("location") as string;
  const salary = formData.get("salary") as string;
  const notes = formData.get("notes") as string;

  await prisma.application.create({
    data: {
      company,
      position,
      jobUrl: jobUrl || null,
      source: source || null,
      location: location || null,
      salary: salary || null,
      notes: notes || null,
    },
  });

  revalidatePath("/");
}

export async function updateStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  await prisma.application.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/");
}

export async function deleteApplication(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.application.delete({
    where: { id },
  });

  revalidatePath("/");
}

const BATCH_SIZE = 100;

export async function syncListings() {
  for (const source of SOURCES) {
    const listings = await fetchListings(source);

    for (let i = 0; i < listings.length; i += BATCH_SIZE) {
      const batch = listings.slice(i, i + BATCH_SIZE);

      await prisma.$transaction(
        batch.map((listing) =>
          prisma.jobListing.upsert({
            where: {
              source_externalId: {
                source: listing.source,
                externalId: listing.externalId,
              },
            },
            create: listing,
            update: {
              company: listing.company,
              position: listing.position,
              url: listing.url,
              location: listing.location,
              category: listing.category,
            },
          }),
        ),
      );
    }
  }
  revalidatePath("/listings");
}

export async function createFromListing(formData: FormData) {
  const id = formData.get("id") as string;

  const listing = await prisma.jobListing.findUniqueOrThrow({
    where: { id },
  });

  await prisma.$transaction(async (tx) => {
    const application = await tx.application.create({
      data: {
        company: listing.company,
        position: listing.position,
        jobUrl: listing.url,
        source: listing.source,
        location: listing.location,
      },
    });

    await tx.jobListing.update({
      where: { id: listing.id },
      data: { applicationId: application.id },
    });
  });
  revalidatePath("/");
  revalidatePath("/listings");
}
