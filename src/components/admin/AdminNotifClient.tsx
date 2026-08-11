"use client";

import { useState } from "react";
import { saveAnnouncement } from "@/app/admin/notifikasi/actions";

export default function AdminNotifClient({ announcement }: { announcement: any }) {
  const [enabled, setEnabled] = useState(announcement?.enabled || false);
  const [title, setTitle] = useState(announcement?.title || "");
  const [message, setMessage] = useState(announcement?.message || "");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setLoading(true);
    await saveAnnouncement({ enabled, title, message });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-200">Notifikasi Ticker</p>
            <p className="text-xs text-slate-500 mt-0.5">Tampil sebagai teks berjalan di halaman user</p>
          </div>
          <button onClick={() => setEnabled(!enabled)}
            className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? "bg-sky-500" : "bg-slate-700"}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${enabled ? "left-5" : "left-0.5"}`} />
          </button>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Judul (opsional)</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="contoh: PROMO"
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/40 transition"/>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Pesan notifikasi</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)}
            placeholder="contoh: Deposit sekarang dan dapatkan bonus 10%!" rows={3}
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/40 transition resize-none"/>
        </div>

        {/* Preview */}
        {message && (
          <div className="bg-sky-500/5 border border-sky-500/15 rounded-xl p-3 overflow-hidden">
            <p className="text-xs text-slate-500 mb-2">Preview tampilan di halaman user:</p>
            <div className="flex items-center gap-2 overflow-hidden">
              {title && <span className="text-xs text-sky-400 font-medium flex-shrink-0">📢 {title}</span>}
              <span className="text-xs text-slate-400 whitespace-nowrap animate-[marquee_8s_linear_infinite]">{message}</span>
            </div>
          </div>
        )}

        {saved && <div className="px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl text-xs text-green-400">✅ Notifikasi berhasil disimpan!</div>}

        <button onClick={handleSave} disabled={loading}
          className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-medium rounded-xl disabled:opacity-50 transition">
          {loading ? "Menyimpan..." : "Simpan Notifikasi"}
        </button>
      </div>
    </div>
  );
}
