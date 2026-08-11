"use client";

import { useState } from "react";
import { saveSettings } from "@/app/admin/settings/actions";

export default function AdminSettingsClient({ setting }: { setting: any }) {
  const [apiKey, setApiKey] = useState(setting?.provider?.apiKey || "");
  const [baseUrl, setBaseUrl] = useState(setting?.provider?.baseUrl || "https://api.smscode.gg/v1");
  const [maintenance, setMaintenance] = useState(setting?.maintenance?.enabled || false);
  const [maintMsg, setMaintMsg] = useState(setting?.maintenance?.message || "");
  const [silverMin, setSilverMin] = useState(setting?.tierLimits?.silverMin || 100);
  const [goldMin, setGoldMin] = useState(setting?.tierLimits?.goldMin || 500);
  const [platMin, setPlatMin] = useState(setting?.tierLimits?.platinumMin || 1000);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setLoading(true);
    await saveSettings({
      "provider.apiKey": apiKey,
      "provider.baseUrl": baseUrl,
      "maintenance.enabled": maintenance,
      "maintenance.message": maintMsg,
      "tierLimits.silverMin": Number(silverMin),
      "tierLimits.goldMin": Number(goldMin),
      "tierLimits.platinumMin": Number(platMin),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4">
      {saved && <div className="px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-sm text-green-400">✅ Settings berhasil disimpan!</div>}

      {/* Provider */}
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-3">
        <p className="text-sm font-medium text-slate-200">Provider SMSCode</p>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">API Key</label>
          <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="API Key SMSCode"
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/40 transition"/>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">Base URL</label>
          <input type="text" value={baseUrl} onChange={e => setBaseUrl(e.target.value)}
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-sky-500/40 transition"/>
        </div>
      </div>

      {/* Tier Limits */}
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-3">
        <p className="text-sm font-medium text-slate-200">Batas Order Naik Tier</p>
        {[
          { label: "Bronze → Silver (min. order)", val: silverMin, set: setSilverMin },
          { label: "Silver → Gold (min. order)", val: goldMin, set: setGoldMin },
          { label: "Gold → Platinum (min. order)", val: platMin, set: setPlatMin },
        ].map(({ label, val, set }) => (
          <div key={label}>
            <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
            <input type="number" value={val} onChange={e => set(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-sky-500/40 transition"/>
          </div>
        ))}
      </div>

      {/* Maintenance */}
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-200">Mode Maintenance</p>
            <p className="text-xs text-slate-500 mt-0.5">User tidak bisa order saat maintenance aktif</p>
          </div>
          <button onClick={() => setMaintenance(!maintenance)}
            className={`w-11 h-6 rounded-full transition-colors relative ${maintenance ? "bg-red-500" : "bg-slate-700"}`}>
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${maintenance ? "left-5" : "left-0.5"}`} />
          </button>
        </div>
        {maintenance && (
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Pesan maintenance</label>
            <input value={maintMsg} onChange={e => setMaintMsg(e.target.value)} placeholder="Sistem sedang dalam perbaikan..."
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-red-500/40 transition"/>
          </div>
        )}
      </div>

      <button onClick={handleSave} disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-medium rounded-xl disabled:opacity-50 transition">
        {loading ? "Menyimpan..." : "Simpan Semua Settings"}
      </button>
    </div>
  );
}
