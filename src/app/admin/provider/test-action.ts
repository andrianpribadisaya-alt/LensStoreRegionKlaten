"use server";

import { connectDB } from "@/lib/db";
import { testSMSCode } from "@/services/smscode";

export async function testConnection() {
  await connectDB();

  return await testSMSCode();
}
