"use client";

import { useState } from "react";
import { createPromo, deletePromo, togglePromo } from "@/app/admin/promo/actions";

export default function AdminPromoClient({ promos }: { promos: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [maxUses, setMaxUses] = useState("0");
  const [minDeposit, setMinDeposit] = useState("0");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(promos);

  async function handleCreate() {
    if (!code || !discount) return;
    setLoading(true);
    await createPromo({ code, discount: Number(discount), maxUses: Number(maxUses), minDeposit: Number(minDeposit), expiresAt });
    setLoading(false);
    setShowForm(false);
    setCode(""); setDiscount(""); setMaxUses("0"); setMinDeposit("0"); setExpiresAt("");
    window.location.reload();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus kode promo ini?")) return;
    await deletePromo(id);
    setList(list.filter(p => p._id !== id));
  }

  async function handleToggle(id: string, active: boolean) {
    await togglePromo(id, !active);
    setList(list.map(p => p._id === id ? { ...p, active: !active } : p));
  }

  return (
    <div className="space-y-4">
      <button onClick={() => setShowForm(!showForm)}
        className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2">
        <i className="ti ti-plus" /> Buat Kode Promo
      </button>

      {showForm && (
        <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-3">
          <p className="text-sm font-medium text-slate-200">Kode Promo Baru</p>
          {[
            { label: "Kode Promo", val: code, set: setCode, ph: "BONUS10", type: "text" },
            { label: "Diskon (%)", val: discount, set: setDiscount, ph: "10", type: "number" },
            { label: "Maks. Penggunaan (0 = unlimited)", val: maxUses, set: setMaxUses, ph: "0", type: "number" },
            { label: "Min. Deposit (Rp)", val: minDeposit, set: setMinDeposit, ph: "0", type: "number" },
          ].map(({ label, val, set, ph, type }) => (
            <div key={label}>
              <label className="block text-xs text-slate-400 mb-1">{label}</label>
              <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={ph}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/40 transition"/>
            </div>
          ))}
          <div>
            <label className="block text-xs text-slate-400 mb-1">Kadaluarsa (opsional)</label>
            <input type="datetime-local" value={expiresAt} onChange={e => setExpiresAt(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-sky-500/40 transition"/>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setShowForm(false)} className="py-2 bg-white/5 border border-white/10 text-slate-400 text-sm rounded-xl">Batal</button>
            <button onClick={handleCreate} disabled={loading || !code || !discount}
              className="py-2 bg-sky-500 text-white text-sm rounded-xl disabled:opacity-50">
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {list.length === 0 ? (
          <div className="text-center py-8 text-sm text-slate-600">Belum ada kode promo</div>
        ) : list.map((p) => (
          <div key={p._id} className="bg-[#0f172a] border border-white/[0.06] rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-sky-400">{p.code}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${p.active ? "bg-green-500/10 text-green-400" : "bg-slate-500/10 text-slate-500"}`}>
                  {p.active ? "Aktif" : "Nonaktif"}
                </span>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => handleToggle(p._id, p.active)}
                  className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-slate-200">
                  <i className={`ti ${p.active ? "ti-toggle-right" : "ti-toggle-left"} text-sm`} />
                </button>
                <button onClick={() => handleDelete(p._id)}
                  className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                  <i className="ti ti-trash text-sm" />
                </button>
              </div>
            </div>
            <div className="flex gap-3 text-xs text-slate-500">
              <span>Diskon: <span className="text-slate-300">{p.discount}%</span></span>
              <span>Dipakai: <span className="text-slate-300">{p.usedCount}/{p.maxUses === 0 ? "∞" : p.maxUses}</span></span>
              {p.minDeposit > 0 && <span>Min: <span className="text-slate-300">Rp{p.minDeposit.toLocaleString("id-ID")}</span></span>}
            </div>
            {p.expiresAt && (
              <p className="text-xs text-slate-600 mt-1">Expires: {new Date(p.expiresAt).toLocaleDateString("id-ID")}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
