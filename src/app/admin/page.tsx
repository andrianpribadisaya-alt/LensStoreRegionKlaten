import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Setting from "@/models/Setting";
import AdminOverviewClient from "@/components/admin/AdminOverviewClient";

export default async function AdminPage() {
  await connectDB();

  const [totalUsers, setting] = await Promise.all([
    User.countDocuments(),
    Setting.findOne().lean(),
  ]);

  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .select("name email role balance totalOrder createdAt")
    .lean();

  return (
    <AdminOverviewClient
      totalUsers={totalUsers}
      recentUsers={JSON.parse(JSON.stringify(recentUsers))}
      setting={JSON.parse(JSON.stringify(setting || {}))}
    />
  );
}
