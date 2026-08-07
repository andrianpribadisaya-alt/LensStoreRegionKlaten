import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import SMSCodeForm from "@/components/admin/SMSCodeForm";

export default async function ProviderPage() {
  await connectDB();

  let setting =
    await Setting.findOne();

  if (!setting) {
    setting = await Setting.create({});
  }

  const provider = {
    apiKey:
      setting.provider?.apiKey || "",

    baseUrl:
      setting.provider?.baseUrl ||
      "https://api.smscode.gg/v1",

    syncInterval:
      setting.provider?.syncInterval || 10,

    autoSync:
      setting.provider?.autoSync ?? true,

    active:
      setting.provider?.active ?? true,
  };

  return (
    <SMSCodeForm
      provider={provider}
    />
  );
}
