"use client";

import { formatRupiah } from "@/lib/utils";

const ROLE_STYLE: Record<string, string> = {
  admin: "bg-red-500/10 text-red-400",
  platinum: "bg-cyan-500/10 text-cyan-400",
  gold: "bg-yellow-400/10 text-yellow-400",
  silver: "bg-slate-400/10 text-slate-300",
  bronze: "bg-amber-600/10 text-amber-500",
};

interface Props {
  totalUsers: number;
  recentUsers: any[];
  setting: any;
}

export default function AdminOverviewClient({ totalUsers, recentUsers, setting }: Props) {
  return (
    <div className="space-y-4">
      {/* Saldo Provider */}
      <div className="bg-[#0f172a] border border-sky-500/15 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 mb-1">Saldo Provider (SMSCode)</p>
          <p className="text-2xl font-medium text-sky-400">Rp 0</p>
          <p className="text-xs text-slate-600 mt-1">Sync dari provider</p>
        </div>
        <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-md">Online</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Total User", value: totalUsers, sub: "terdaftar", color: "text-sky-400", bg: "bg-sky-500/10", icon: "ti-users" },
          { label: "Keuntungan", value: "Rp 0", sub: "bulan ini", color: "text-green-400", bg: "bg-green-500/10", icon: "ti-coin" },
          { label: "Total Transaksi", value: "0", sub: "semua waktu", color: "text-indigo-400", bg: "bg-indigo-500/10", icon: "ti-arrows-exchange" },
          { label: "Sukses Rate", value: "0%", sub: "30 hari terakhir", color: "text-yellow-400", bg: "bg-yellow-500/10", icon: "ti-chart-line" },
        ].map((s) => (
          <div key={s.label} className="bg-[#0f172a] border border-white/[0.06] rounded-xl p-3">
            <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
              <i className={`ti ${s.icon} text-sm ${s.color}`} />
            </div>
            <p className="text-xs text-slate-500 mb-1">{s.label}</p>
            <p className={`text-lg font-medium text-slate-100`}>{s.value}</p>
            <p className={`text-xs mt-0.5 ${s.color}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-slate-400">User terbaru</p>
          <a href="/admin/users" className="text-xs text-sky-500">Lihat semua →</a>
        </div>
        <div className="bg-[#0f172a] border border-white/[0.06] rounded-xl overflow-hidden">
          {recentUsers.length === 0 ? (
            <p className="text-center text-xs text-slate-600 py-6">Belum ada user</p>
          ) : (
            recentUsers.map((u: any) => (
              <div key={u._id} className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/[0.04] last:border-0">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
                  {u.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-200 font-medium truncate">{u.name}</p>
                  <p className="text-xs text-slate-500 truncate">{u.email}</p>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${ROLE_STYLE[u.role] || ROLE_STYLE.bronze}`}>
                  {u.role}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
