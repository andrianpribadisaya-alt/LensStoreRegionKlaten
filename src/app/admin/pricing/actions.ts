"use server";

import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import { revalidatePath } from "next/cache";

export async function savePricing(data: {
  bronze: number;
  silver: number;
  gold: number;
  platinum: number;
}) {
  await connectDB();

  let setting = await Setting.findOne();

  if (!setting) {
    setting = await Setting.create({
      pricing: data,
    });
  } else {
    setting.pricing = data;
    await setting.save();
  }

  revalidatePath("/admin/pricing");
}
