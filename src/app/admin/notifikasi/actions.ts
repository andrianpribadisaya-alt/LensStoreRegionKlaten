"use server";

import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import { revalidatePath } from "next/cache";

export async function saveAnnouncement(data: {
  enabled: boolean;
  title: string;
  message: string;
}) {
  await connectDB();
  await Setting.findOneAndUpdate({}, { announcement: data }, { upsert: true });
  revalidatePath("/admin/notifikasi");
  revalidatePath("/dashboard");
}
