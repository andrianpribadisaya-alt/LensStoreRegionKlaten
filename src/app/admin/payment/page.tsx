import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import TokopayForm from "@/components/admin/TokopayForm";

export default async function Page() {

    await connectDB();

    let setting = await Setting.findOne();

    if (!setting) {

        setting = await Setting.create({});

    }

    return (

        <TokopayForm

            payment={JSON.parse(JSON.stringify(setting.payment))}

        />

    )

}
