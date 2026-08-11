"use server";

import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import { revalidatePath } from "next/cache";

export async function saveSettings(data: any) {
  await connectDB();
  await Setting.findOneAndUpdate({}, data, { upsert: true });
  revalidatePath("/admin/settings");
}
