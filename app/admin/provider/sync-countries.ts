"use server";

import { connectDB } from "@/lib/db";
import Country from "@/models/Country";
import { fetchCountries } from "@/services/smscode";

export async function syncCountries() {
  await connectDB();

  const list = await fetchCountries();

  let total = 0;

  for (const item of list) {
    await Country.findOneAndUpdate(
      {
        countryId: item.id,
      },
      {
        countryId: item.id,
        name: item.name,
        code: item.code,
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
