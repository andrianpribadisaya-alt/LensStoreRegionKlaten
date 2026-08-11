"use server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, role: string) {
  await connectDB();
  await User.findByIdAndUpdate(userId, { role });
  revalidatePath("/admin/users");
}

export async function updateUserBalance(userId: string, amount: number, type: "add" | "cut") {
  await connectDB();
  const user = await User.findById(userId);
  if (!user) throw new Error("User tidak ditemukan");

  const newBalance = type === "add"
    ? user.balance + amount
    : Math.max(0, user.balance - amount);

  await User.findByIdAndUpdate(userId, { balance: newBalance });
  revalidatePath("/admin/users");
}

export async function updateUserStatus(userId: string, status: "active" | "banned") {
  await connectDB();
  await User.findByIdAndUpdate(userId, { status });
  revalidatePath("/admin/users");
}
