import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Service from "@/models/Service";
import Setting from "@/models/Setting";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  let user = null;
  let services = [];
  let tierLimits = { silverMin: 100, goldMin: 500, platinumMin: 1000 };

  try {
    const session = await auth();

    await connectDB();

    if (session?.user?.email) {
      user = await User.findOne({ email: session.user.email }).lean();
    }

    services = await Service.find({ active: true })
      .sort({ name: 1 })
      .lean() as any[];

    let setting = await Setting.findOne().lean() as any;
    if (setting?.tierLimits) {
      tierLimits = setting.tierLimits;
    }
  } catch (e) {
    console.error("Dashboard error:", e);
  }

  return (
    <DashboardClient
      user={user ? JSON.parse(JSON.stringify(user)) : null}
      services={JSON.parse(JSON.stringify(services))}
      tierLimits={JSON.parse(JSON.stringify(tierLimits))}
    />
  );
}
