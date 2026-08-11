import { connectDB } from "@/lib/db";
import Promo from "@/models/Promo";
import AdminPromoClient from "@/components/admin/AdminPromoClient";

export default async function AdminPromoPage() {
  await connectDB();
  const promos = await Promo.find().sort({ createdAt: -1 }).lean();
  return <AdminPromoClient promos={JSON.parse(JSON.stringify(promos))} />;
}
