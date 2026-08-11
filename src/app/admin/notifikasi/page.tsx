import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import AdminNotifClient from "@/components/admin/AdminNotifClient";

export default async function AdminNotifPage() {
  await connectDB();
  const setting = await Setting.findOne().lean();
  return <AdminNotifClient announcement={(setting as any)?.announcement || {}} />;
}
