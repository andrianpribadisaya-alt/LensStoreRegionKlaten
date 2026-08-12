"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/utils";

const TYPE_STYLE: Record<string, string> = {
  deposit: "bg-green-500/10 text-green-400 border-green-500/20",
  purchase: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  refund: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  adjustment: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const TYPE_LABEL: Record<string, string> = {
  deposit: "Deposit",
  purchase: "Pembelian",
  refund: "Refund",
  adjustment: "Penyesuaian",
};

export default function AdminTransaksiClient({ transactions }: { transactions: any[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = transactions.filter(t => {
    const matchSearch = 
      t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.user?.email?.toLowerCase().includes(search.toLowerCase()) ||
      t.note?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || t.type === filter;
    return matchSearch && matchFilter;
  });

  const totalAmount = filtered.reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0f172a] border border-white/[0.06] rounded-xl p-3">
          <p className="text-xs text-slate-500 mb-1">Total Transaksi</p>
          <p className="text-xl font-medium text-slate-100">{filtered.length}</p>
        </div>
        <div className="bg-[#0f172a] border border-white/[0.06] rounded-xl p-3">
          <p className="text-xs text-slate-500 mb-1">Total Nilai</p>
          <p className="text-xl font-medium text-sky-400">{formatRupiah(totalAmount)}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari user atau catatan..."
          className="w-full pl-9 pr-4 py-2.5 bg-[#0f172a] border border-white/[0.06] rounded-xl text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500/40 transition"/>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["all", "deposit", "purchase", "refund", "adjustment"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-lg border whitespace-nowrap transition capitalize ${
              filter === f
                ? "bg-sky-500/10 border-sky-500/30 text-sky-400"
                : "bg-white/5 border-white/10 text-slate-400"
            }`}>
            {f === "all" ? "Semua" : TYPE_LABEL[f]}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-slate-600 py-8">Belum ada transaksi</p>
        ) : filtered.map((t) => (
          <div key={t._id} className="flex items-center gap-3 px-3 py-3 border-b border-white/[0.04] last:border-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
              {t.user?.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate">{t.user?.name || "Unknown"}</p>
              <p className="text-xs text-slate-500 truncate">{t.note || "-"}</p>
              <p className="text-xs text-slate-600 mt-0.5">
                {new Date(t.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className={`text-sm font-medium ${t.amount >= 0 ? "text-green-400" : "text-red-400"}`}>
                {t.amount >= 0 ? "+" : ""}{formatRupiah(t.amount || 0)}
              </p>
              <span className={`text-xs px-1.5 py-0.5 rounded border ${TYPE_STYLE[t.type] || TYPE_STYLE.deposit}`}>
                {TYPE_LABEL[t.type] || t.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
