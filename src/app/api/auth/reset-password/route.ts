import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { email, token, password } = await req.json();

    if (!email || !token || !password) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({
      email: email.toLowerCase(),
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }, // token belum kadaluarsa
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kode tidak valid atau sudah kadaluarsa (30 menit)." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return NextResponse.json({ message: "Password berhasil direset." });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
