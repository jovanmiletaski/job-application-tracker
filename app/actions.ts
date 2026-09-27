"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Status } from "@/app/generated/prisma/client";

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
