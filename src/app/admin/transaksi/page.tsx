import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import AdminTransaksiClient from "@/components/admin/AdminTransaksiClient";

export default async function AdminTransaksiPage() {
  await connectDB();

  const transactions = await Transaction.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  return <AdminTransaksiClient transactions={JSON.parse(JSON.stringify(transactions))} />;
}
