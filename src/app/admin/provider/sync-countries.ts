"use server";

import { connectDB } from "@/lib/db";
import Country from "@/models/Country";
import { fetchCountries } from "@/services/smscode";

export async function syncCountries() {
  await connectDB();

  const countries =
    await fetchCountries();

  if (!Array.isArray(countries)) {
    throw new Error(
      "Format data negara dari SMSCode tidak valid."
    );
  }

  let total = 0;

  for (const item of countries) {
    if (
      item?.id === undefined ||
      !item?.name
    ) {
      continue;
    }

    await Country.findOneAndUpdate(
      {
        countryId: String(item.id),
      },
      {
        countryId: String(item.id),
        code: item.code || "",
        name: item.name,
        dialCode: item.dial_code || "",
        emoji: item.emoji || "",
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
      `Berhasil sinkronisasi ${total} negara.`,
  };
}
