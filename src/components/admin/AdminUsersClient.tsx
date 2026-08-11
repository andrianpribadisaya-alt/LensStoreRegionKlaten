"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import { updateUserRole, updateUserBalance, updateUserStatus } from "@/app/admin/users/actions";

const ROLES = ["bronze", "silver", "gold", "platinum", "admin"];
const ROLE_STYLE: Record<string, string> = {
  admin: "bg-red-500/10 text-red-400 border-red-500/20",
  platinum: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  gold: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  silver: "bg-slate-400/10 text-slate-300 border-slate-400/20",
  bronze: "bg-amber-600/10 text-amber-500 border-amber-600/20",
};

export default function AdminUsersClient({ users }: { users: any[] }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  async function handleRole(role: string) {
    if (!selected) return;
    setLoading(true);
    await updateUserRole(selected._id, role);
    setMsg("Role berhasil diubah!");
    setSelected({ ...selected, role });
    setLoading(false);
    setTimeout(() => setMsg(""), 2000);
  }

  async function handleBalance(type: "add" | "cut") {
    if (!selected || !amount) return;
    setLoading(true);
    await updateUserBalance(selected._id, Number(amount), type);
    setMsg(`Saldo berhasil ${type === "add" ? "ditambah" : "dipotong"}!`);
    setAmount("");
    setLoading(false);
    setTimeout(() => setMsg(""), 2000);
  }

  async function handleStatus() {
    if (!selected) return;
    const newStatus = selected.status === "active" ? "banned" : "active";
    setLoading(true);
    await updateUserStatus(selected._id, newStatus);
    setSelected({ ...selected, status: newStatus });
    setMsg(`User berhasil ${newStatus === "banned" ? "dibanned" : "diaktifkan"}!`);
    setLoading(false);
    setTimeout(() => setMsg(""), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari user..." 
          className="w-full pl-9 pr-4 py-2.5 bg-[#0f172a] border border-white/[0.06] rounded-xl text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500/40 transition"/>
      </div>

      <div className="bg-[#0f172a] border border-white/[0.06] rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-slate-600 py-8">User tidak ditemukan</p>
        ) : filtered.map((u) => (
          <div key={u._id} className="flex items-center gap-3 px-3 py-3 border-b border-white/[0.04] last:border-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-xs text-white font-medium flex-shrink-0">
              {u.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 font-medium truncate">{u.name}</p>
              <p className="text-xs text-slate-500 truncate">{u.email}</p>
              <p className="text-xs text-sky-400 mt-0.5">{formatRupiah(u.balance || 0)}</p>
            </div>
            <span className={`text-xs px-1.5 py-0.5 rounded border font-medium flex-shrink-0 ${ROLE_STYLE[u.role] || ROLE_STYLE.bronze}`}>
              {u.role}
            </span>
            <button onClick={() => setSelected(u)}
              className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-slate-200 flex-shrink-0">
              <i className="ti ti-dots-vertical text-sm" />
            </button>
          </div>
        ))}
      </div>

      {/* Modal User Detail */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#0d1526] border border-white/[0.08] rounded-2xl p-5 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-sm text-white font-medium">
                {selected.name?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-100">{selected.name}</p>
                <p className="text-xs text-slate-500">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-300">
                <i className="ti ti-x text-lg" />
              </button>
            </div>

            {msg && <div className="mb-3 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-xs text-green-400">{msg}</div>}

            {/* Saldo */}
            <div className="mb-3">
              <p className="text-xs text-slate-400 mb-2">Saldo saat ini: <span className="text-sky-400 font-medium">{formatRupiah(selected.balance || 0)}</span></p>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Jumlah (Rp)"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/40 transition mb-2"/>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleBalance("add")} disabled={loading || !amount}
                  className="py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-xs rounded-xl transition disabled:opacity-50">
                  + Tambah Saldo
                </button>
                <button onClick={() => handleBalance("cut")} disabled={loading || !amount}
                  className="py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-xs rounded-xl transition disabled:opacity-50">
                  - Potong Saldo
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="mb-3">
              <p className="text-xs text-slate-400 mb-2">Set Role</p>
              <div className="flex flex-wrap gap-2">
                {ROLES.map(r => (
                  <button key={r} onClick={() => handleRole(r)} disabled={loading}
                    className={`px-2.5 py-1 text-xs rounded-lg border transition capitalize ${
                      selected.role === r
                        ? ROLE_STYLE[r] + " font-medium"
                        : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                    }`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Ban/Unban */}
            <button onClick={handleStatus} disabled={loading}
              className={`w-full py-2 text-xs rounded-xl border transition ${
                selected.status === "active"
                  ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                  : "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20"
              }`}>
              {selected.status === "active" ? "🚫 Ban User" : "✅ Aktifkan User"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
