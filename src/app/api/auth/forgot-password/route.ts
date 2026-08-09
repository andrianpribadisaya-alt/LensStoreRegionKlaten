import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { randomString } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email wajib diisi." },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });

    // Selalu kembalikan pesan sukses (supaya tidak ketahuan email terdaftar atau tidak)
    if (!user || !user.password) {
      return NextResponse.json({
        message: "Jika email terdaftar, kode reset akan dikirim.",
      });
    }

    // Generate token 6 digit angka (mudah diketik user)
    const token = Math.floor(100000 + Math.random() * 900000).toString();

    // Kadaluarsa 30 menit dari sekarang
    const expires = new Date(Date.now() + 30 * 60 * 1000);

    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    });

    // TODO: kirim email dengan token
    // Untuk sekarang, token ditampilkan di response (development only)
    console.log(`Reset token untuk ${email}: ${token}`);

    return NextResponse.json({
      message: "Jika email terdaftar, kode reset akan dikirim.",
      // Hapus baris ini setelah email service aktif:
      devToken: process.env.NODE_ENV === "development" ? token : undefined,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
