import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import PricingForm from "@/components/admin/PricingForm";

export default async function PricingPage() {
  await connectDB();

  let setting = await Setting.findOne();

  if (!setting) {
    setting = await Setting.create({
      pricing: {
        bronze: 10,
        silver: 7,
        gold: 5,
        platinum: 2,
      },
    });
  }

  return (
    <PricingForm
      pricing={JSON.parse(JSON.stringify(setting.pricing))}
    />
  );
}
