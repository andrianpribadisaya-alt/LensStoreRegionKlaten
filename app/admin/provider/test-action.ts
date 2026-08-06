"use server";

import { testSMSCode } from "@/services/smscode";

export async function testConnection(){

    return await testSMSCode();

}
