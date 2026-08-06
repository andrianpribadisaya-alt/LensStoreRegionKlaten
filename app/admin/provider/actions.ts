"use server";

import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import { revalidatePath } from "next/cache";

export async function saveProvider(data:any){

    await connectDB();

    let setting=await Setting.findOne();

    setting.provider=data;

    await setting.save();

    revalidatePath("/admin/provider");

}
