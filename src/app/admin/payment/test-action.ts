"use server";

import { testTokopay } from "@/services/tokopay";

export async function testConnection(){

    return await testTokopay();

}
