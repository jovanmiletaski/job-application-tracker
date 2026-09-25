"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Status } from "@/app/generated/prisma/client";

export async function createApplication(formData: FormData) {
  const company = formData.get("company") as string;
  const position = formData.get("position") as string;

  await prisma.application.create({
    data: {
      company,
      position,
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
