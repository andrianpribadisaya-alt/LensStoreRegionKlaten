import Setting from "@/models/Setting";

export async function calculatePrice(
  providerPrice: number,
  role: "bronze" | "silver" | "gold" | "platinum"
) {
  const setting = await Setting.findOne();

  if (!setting) return providerPrice;

  const margin = setting.pricing[role];

  return Math.ceil(
    providerPrice +
      (providerPrice * margin) / 100
  );
}
