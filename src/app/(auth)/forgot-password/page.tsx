"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSent(true);
  }

  if (sent) return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-[#0d1526] border border-white/[0.08] rounded-2xl p-7 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <svg className="w-7 h-7 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h2 className="text-lg font-medium text-slate-100 mb-2">Cek email kamu</h2>
          <p className="text-sm text-slate-500 mb-6">Kode OTP dikirim ke <span className="text-slate-300">{email}</span>. Berlaku 30 menit.</p>
          <button onClick={()=>router.push(`/reset-password?email=${encodeURIComponent(email)}`)}
            className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2">
            Masukkan Kode OTP <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </button>
          <p className="text-xs text-slate-600 mt-4"><Link href="/login" className="text-sky-500 hover:text-sky-400">← Kembali ke login</Link></p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <div className="bg-[#0d1526] border border-white/[0.08] rounded-2xl p-7">
          <div className="text-center mb-6">
            <h1 className="text-xl font-medium text-slate-100">Lupa Password?</h1>
            <p className="text-sm text-slate-500 mt-1">Masukkan email untuk dapat kode reset</p>
          </div>

          <div className="bg-sky-500/5 border border-sky-500/15 rounded-xl p-3 flex gap-2.5 mb-5">
            <svg className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <p className="text-xs text-slate-400 leading-relaxed">Kode OTP 6 digit akan dikirim ke email kamu. Berlaku selama <strong className="text-sky-400">30 menit</strong>.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Email terdaftar</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="nama@gmail.com" required
                  className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition"/>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-medium rounded-xl transition disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? "Mengirim..." : <>Kirim Kode OTP <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></>}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-5">
            <Link href="/login" className="text-sky-500 hover:text-sky-400">← Kembali ke login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
