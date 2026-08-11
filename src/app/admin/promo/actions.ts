"use server";

import { connectDB } from "@/lib/db";
import Promo from "@/models/Promo";
import { revalidatePath } from "next/cache";

export async function createPromo(data: {
  code: string;
  discount: number;
  maxUses: number;
  minDeposit: number;
  expiresAt?: string;
}) {
  await connectDB();
  await Promo.create({
    ...data,
    code: data.code.toUpperCase(),
    expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
  });
  revalidatePath("/admin/promo");
}

export async function deletePromo(id: string) {
  await connectDB();
  await Promo.findByIdAndDelete(id);
  revalidatePath("/admin/promo");
}

export async function togglePromo(id: string, active: boolean) {
  await connectDB();
  await Promo.findByIdAndUpdate(id, { active });
  revalidatePath("/admin/promo");
}
