"use client";

import { useState } from "react";
import { saveSettings } from "@/app/admin/settings/actions";

export default function AdminSettingsClient({ setting }: { setting: any }) {
  // Provider
  const [apiKey, setApiKey] = useState(setting?.provider?.apiKey || "");
  const [baseUrl, setBaseUrl] = useState(setting?.provider?.baseUrl || "https://api.smscode.gg/v1");

  // Margin per tier
  const [marginBronze, setMarginBronze] = useState(setting?.margin?.bronze ?? 10);
  const [marginSilver, setMarginSilver] = useState(setting?.margin?.silver ?? 8);
  const [marginGold, setMarginGold] = useState(setting?.margin?.gold ?? 5);
  const [marginPlatinum, setMarginPlatinum] = useState(setting?.margin?.platinum ?? 2);

  // Tier limits
  const [silverMin, setSilverMin] = useState(setting?.tierLimits?.silverMin ?? 100);
  const [goldMin, setGoldMin] = useState(setting?.tierLimits?.goldMin ?? 500);
  const [platMin, setPlatMin] = useState(setting?.tierLimits?.platinumMin ?? 1000);

  // Tokopay
  const [tokopayMerchant, setTokopayMerchant] = useState(setting?.tokopay?.merchantId || "");
  const [tokopaySecret, setTokopaySecret] = useState(setting?.tokopay?.secretKey || "");
  const [tokopayActive, setTokopayActive] = useState(setting?.tokopay?.active || false);

  // Midtrans
  const [midtransServer, setMidtransServer] = useState(setting?.midtrans?.serverKey || "");
  const [midtransClient, setMidtransClient] = useState(setting?.midtrans?.clientKey || "");
  const [midtransProd, setMidtransProd] = useState(setting?.midtrans?.isProduction || false);
  const [midtransActive, setMidtransActive] = useState(setting?.midtrans?.active || false);

  // Maintenance
  const [maintenance, setMaintenance] = useState(setting?.maintenance?.enabled || false);
  const [maintMsg, setMaintMsg] = useState(setting?.maintenance?.message || "");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setLoading(true);
    await saveSettings({
      "provider.apiKey": apiKey,
      "provider.baseUrl": baseUrl,
      "margin.bronze": Number(marginBronze),
      "margin.silver": Number(marginSilver),
      "margin.gold": Number(marginGold),
      "margin.platinum": Number(marginPlatinum),
      "tierLimits.silverMin": Number(silverMin),
      "tierLimits.goldMin": Number(goldMin),
      "tierLimits.platinumMin": Number(platMin),
      "tokopay.merchantId": tokopayMerchant,
      "tokopay.secretKey": tokopaySecret,
      "tokopay.active": tokopayActive,
      "midtrans.serverKey": midtransServer,
      "midtrans.clientKey": midtransClient,
      "midtrans.isProduction": midtransProd,
      "midtrans.active": midtransActive,
      "maintenance.enabled": maintenance,
      "maintenance.message": maintMsg,
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const Toggle = ({ val, set }: { val: boolean; set: (v: boolean) => void }) => (
    <button onClick={() => set(!val)}
      className={`w-10 h-5 rounded-full transition-colors relative flex-shrink-0 ${val ? "bg-sky-500" : "bg-slate-700"}`}>
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${val ? "left-5" : "left-0.5"}`} />
    </button>
  );

  const Input = ({ label, val, set, ph, type = "text" }: any) => (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
      <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={ph}
        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500/40 transition"/>
    </div>
  );

  return (
    <div className="space-y-4 pb-6">
      {saved && (
        <div className="px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-sm text-green-400">
          ✅ Settings berhasil disimpan!
        </div>
      )}

      {/* Provider SMSCode */}
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-3">
        <p className="text-sm font-medium text-slate-200">🔌 Provider SMSCode</p>
        <Input label="API Key" val={apiKey} set={setApiKey} ph="API Key SMSCode"/>
        <Input label="Base URL" val={baseUrl} set={setBaseUrl} ph="https://api.smscode.gg/v1"/>
      </div>

      {/* Margin per Tier */}
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-3">
        <p className="text-sm font-medium text-slate-200">💰 Margin Global per Tier (%)</p>
        <p className="text-xs text-slate-500">Harga jual = Harga provider + margin %</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Bronze (%)", val: marginBronze, set: setMarginBronze, color: "text-amber-500" },
            { label: "Silver (%)", val: marginSilver, set: setMarginSilver, color: "text-slate-300" },
            { label: "Gold (%)", val: marginGold, set: setMarginGold, color: "text-yellow-400" },
            { label: "Platinum (%)", val: marginPlatinum, set: setMarginPlatinum, color: "text-cyan-400" },
          ].map(({ label, val, set, color }) => (
            <div key={label}>
              <label className={`block text-xs mb-1.5 font-medium ${color}`}>{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)} min="0" max="100"
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-sky-500/40 transition"/>
            </div>
          ))}
        </div>
      </div>

      {/* Tier Limits */}
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-3">
        <p className="text-sm font-medium text-slate-200">🏆 Batas Order Naik Tier</p>
        {[
          { label: "Bronze → Silver (min. order)", val: silverMin, set: setSilverMin },
          { label: "Silver → Gold (min. order)", val: goldMin, set: setGoldMin },
          { label: "Gold → Platinum (min. order)", val: platMin, set: setPlatMin },
        ].map(({ label, val, set }) => (
          <Input key={label} label={label} val={val} set={set} ph="100" type="number"/>
        ))}
      </div>

      {/* Tokopay */}
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-200">💳 Tokopay</p>
          <Toggle val={tokopayActive} set={setTokopayActive}/>
        </div>
        <Input label="Merchant ID" val={tokopayMerchant} set={setTokopayMerchant} ph="Merchant ID Tokopay"/>
        <Input label="Secret Key" val={tokopaySecret} set={setTokopaySecret} ph="Secret Key Tokopay"/>
      </div>

      {/* Midtrans */}
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-200">💳 Midtrans</p>
          <Toggle val={midtransActive} set={setMidtransActive}/>
        </div>
        <Input label="Server Key" val={midtransServer} set={setMidtransServer} ph="Server Key Midtrans"/>
        <Input label="Client Key" val={midtransClient} set={setMidtransClient} ph="Client Key Midtrans"/>
        <div className="flex items-center justify-between py-1">
          <div>
            <p className="text-xs text-slate-300">Production Mode</p>
            <p className="text-xs text-slate-600">Matikan untuk mode Sandbox/Testing</p>
          </div>
          <Toggle val={midtransProd} set={setMidtransProd}/>
        </div>
      </div>

      {/* Maintenance */}
      <div className="bg-[#0f172a] border border-white/[0.06] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-200">🔧 Mode Maintenance</p>
            <p className="text-xs text-slate-500 mt-0.5">User tidak bisa order saat aktif</p>
          </div>
          <Toggle val={maintenance} set={setMaintenance}/>
        </div>
        {maintenance && (
          <Input label="Pesan maintenance" val={maintMsg} set={setMaintMsg} ph="Sistem sedang dalam perbaikan..."/>
        )}
      </div>

      <button onClick={handleSave} disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-sm font-medium rounded-xl disabled:opacity-50 transition">
        {loading ? "Menyimpan..." : "Simpan Semua Settings"}
      </button>
    </div>
  );
}
