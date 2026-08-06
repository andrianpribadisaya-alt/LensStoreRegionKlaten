import Setting from "@/models/Setting";

export async function calculatePrice(
  providerPrice: number,
  role: "bronze" | "silver" | "gold" | "platinum"
) {
  const setting = await Setting.findOne();

  if (!setting) {
    throw new Error("Setting belum dibuat");
  }

  const margin = setting.pricing[role] ?? 0;

  return Math.ceil(providerPrice + (providerPrice * margin / 100));
}
