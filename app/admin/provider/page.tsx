import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import SMSCodeForm from "@/components/admin/SMSCodeForm";

export default async function Page(){

    await connectDB();

    let setting=await Setting.findOne();

    if(!setting){

        setting=await Setting.create({});

    }

    return(

        <SMSCodeForm

            provider={JSON.parse(JSON.stringify(setting.provider))}

        />

    )

}
