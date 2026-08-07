"use server";

import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import { revalidatePath } from "next/cache";

interface ProviderData {
  apiKey: string;
  baseUrl: string;
  syncInterval: number;
  autoSync: boolean;
  active: boolean;
}

export async function saveProvider(
  data: ProviderData
) {
  await connectDB();

  const setting =
    (await Setting.findOne()) ||
    new Setting();

  setting.provider = {
    name: "smscode",
    apiKey: data.apiKey.trim(),
    baseUrl:
      data.baseUrl.trim() ||
      "https://api.smscode.gg/v1",
    syncInterval: Math.max(
      1,
      Number(data.syncInterval) || 10
    ),
    autoSync: Boolean(data.autoSync),
    active: Boolean(data.active),
  };

  await setting.save();

  revalidatePath("/admin/provider");

  return {
    success: true,
    message:
      "Pengaturan SMSCode berhasil disimpan.",
  };
}
