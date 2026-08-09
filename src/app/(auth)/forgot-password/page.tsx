"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-[#0d1526] border border-white/8 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
              <svg className="w-7 h-7 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-slate-100 mb-2">Cek email kamu</h2>
            <p className="text-sm text-slate-500 mb-6">
              Kode reset password telah dikirim ke <span className="text-slate-300">{email}</span>. Kode berlaku selama 30 menit.
            </p>
            <button
              onClick={() => router.push(`/reset-password?email=${encodeURIComponent(email)}`)}
              className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-medium rounded-xl"
            >
              Masukkan kode →
            </button>
            <p className="text-xs text-slate-600 mt-4">
              <Link href="/login" className="text-sky-500 hover:text-sky-400">← Kembali ke login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-sm relative z-10">
        <div className="bg-[#0d1526] border border-white/8 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 mb-4">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 className="text-xl font-medium text-slate-100">Lupa password?</h1>
            <p className="text-sm text-slate-500 mt-1">Masukkan email untuk mendapat kode reset</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Email terdaftar</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@gmail.com"
                required
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-medium rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Mengirim..." : "Kirim kode reset →"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-6">
            <Link href="/login" className="text-sky-500 hover:text-sky-400">← Kembali ke login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
