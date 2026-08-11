import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import AdminSettingsClient from "@/components/admin/AdminSettingsClient";

export default async function AdminSettingsPage() {
  await connectDB();
  let setting = await Setting.findOne().lean();
  if (!setting) setting = await Setting.create({});
  return <AdminSettingsClient setting={JSON.parse(JSON.stringify(setting))} />;
}
