"use server";

import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { fetchServices } from "@/services/smscode";

export async function syncServices() {
  await connectDB();

  const services = await fetchServices();

  if (!Array.isArray(services)) {
    throw new Error(
      "Format data service dari SMSCode tidak valid."
    );
  }

  let total = 0;

  for (const item of services) {
    if (
      item?.id === undefined ||
      !item?.name
    ) {
      continue;
    }

    await Service.findOneAndUpdate(
      {
        serviceId: String(item.id),
      },
      {
        serviceId: String(item.id),
        code: item.code || "",
        name: item.name,
        providerActive:
          item.active !== false,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    total++;
  }

  return {
    success: true,
    total,
    message:
      `Berhasil sinkronisasi ${total} service.`,
  };
}
