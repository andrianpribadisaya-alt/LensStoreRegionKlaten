import { connectDB } from "@/lib/db";
import User from "@/models/User";
import AdminUsersClient from "@/components/admin/AdminUsersClient";

export default async function AdminUsersPage() {
  await connectDB();
  const users = await User.find().sort({ createdAt: -1 }).lean();
  return <AdminUsersClient users={JSON.parse(JSON.stringify(users))} />;
}
