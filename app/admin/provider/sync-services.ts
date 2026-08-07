"use server";

import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { fetchServices } from "@/services/smscode";

export async function syncServices() {
  await connectDB();

  const list = await fetchServices();

  let total = 0;

  for (const item of list) {
    await Service.findOneAndUpdate(
      {
        serviceId: item.id,
      },
      {
        serviceId: item.id,
        name: item.name,
        category: item.category,
      },
      {
        upsert: true,
      }
    );

    total++;
  }

  return {
    success: true,
    total,
  };
}
