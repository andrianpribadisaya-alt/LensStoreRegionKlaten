import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Service from "@/models/Service";
import Setting from "@/models/Setting";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  await connectDB();

  // Ambil data user dari DB (biar fresh)
  const user = session?.user?.email
    ? await User.findOne({ email: session.user.email }).lean()
    : null;

  // Ambil semua service/platform yang aktif
  const services = await Service.find({ active: true })
    .sort({ name: 1 })
    .lean();

  // Ambil setting untuk tierLimits
  let setting = await Setting.findOne().lean();
  if (!setting) {
    setting = await Setting.create({});
  }

  const tierLimits = (setting as any)?.tierLimits ?? {
    silverMin: 100,
    goldMin: 500,
    platinumMin: 1000,
  };

  return (
    <DashboardClient
      user={user ? JSON.parse(JSON.stringify(user)) : null}
      services={JSON.parse(JSON.stringify(services))}
      tierLimits={JSON.parse(JSON.stringify(tierLimits))}
    />
  );
}
