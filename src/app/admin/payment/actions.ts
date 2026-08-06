"use server";

import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import { revalidatePath } from "next/cache";

export async function savePayment(data:any){

    await connectDB();

    let setting = await Setting.findOne();

    setting.payment=data;

    await setting.save();

    revalidatePath("/admin/payment");

}
