"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/utils";

interface TierLimits {
  silverMin: number;
  goldMin: number;
  platinumMin: number;
}

interface Service {
  _id: string;
  serviceId: string;
  name: string;
  code: string;
  active: boolean;
}

interface User {
  name: string;
  email: string;
  image?: string;
  balance: number;
  totalOrder: number;
  totalDeposit: number;
  role: string;
  status: string;
}

interface Props {
  user: User | null;
  services: Service[];
  tierLimits: TierLimits;
}

const TIER_ORDER = ["bronze", "silver", "gold", "platinum"];
const TIER_COLORS: Record<string, string> = {
  bronze: "text-amber-600",
  silver: "text-slate-300",
  gold: "text-yellow-400",
  platinum: "text-cyan-400",
};
const TIER_BG: Record<string, string> = {
  bronze: "from-amber-600/20 to-amber-800/10 border-amber-600/20",
  silver: "from-slate-400/20 to-slate-600/10 border-slate-400/20",
  gold: "from-yellow-400/20 to-yellow-600/10 border-yellow-400/20",
  platinum: "from-cyan-400/20 to-cyan-600/10 border-cyan-400/20",
};

function getTierProgress(role: string, totalOrder: number, limits: TierLimits) {
  if (role === "platinum") return { next: null, percent: 100, current: totalOrder, target: 0 };

  const targets: Record<string, number> = {
    bronze: limits.silverMin,
    silver: limits.goldMin,
    gold: limits.platinumMin,
  };
  const nextTiers: Record<string, string> = {
    bronze: "Silver",
    silver: "Gold",
    gold: "Platinum",
  };

  const target = targets[role] ?? 100;
  const percent = Math.min(Math.round((totalOrder / target) * 100), 100);

  return {
    next: nextTiers[role],
    percent,
    current: totalOrder,
    target,
  };
}

// Platform icons mapping (pakai emoji sebagai fallback)
const PLATFORM_ICONS: Record<string, string> = {
  whatsapp: "💬",
  telegram: "✈️",
  instagram: "📸",
  tiktok: "🎵",
  facebook: "👥",
  google: "🔍",
  gmail: "📧",
  twitter: "🐦",
  discord: "🎮",
  openai: "🤖",
  chatgpt: "🤖",
  apple: "🍎",
  microsoft: "🪟",
  shopee: "🛒",
  tokopedia: "🟢",
  gojek: "🚗",
  grab: "🟩",
};

function getPlatformIcon(name: string) {
  const lower = name.toLowerCase();
  for (const key of Object.keys(PLATFORM_ICONS)) {
    if (lower.includes(key)) return PLATFORM_ICONS[key];
  }
  return "📱";
}

export default function DashboardClient({ user, services, tierLimits }: Props) {
  const [search, setSearch] = useState("");

  const role = user?.role ?? "bronze";
  const balance = user?.balance ?? 0;
  const totalOrder = user?.totalOrder ?? 0;
  const totalDeposit = user?.totalDeposit ?? 0;
  const name = user?.name ?? "Guest";

  const tierProgress = getTierProgress(role, totalOrder, tierLimits);

  // Hitung success rate (placeholder — nanti bisa dari data order asli)
  const successRate = totalOrder > 0 ? 18 : 0;

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-medium text-slate-100">
          Welcome back, <span className="text-sky-400">{name}</span> 👋
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Berikut ringkasan akun kamu hari ini
        </p>
      </div>

      {/* Stats Grid 2x2 */}
      <div className="grid grid-cols-2 gap-3">
        {/* Balance */}
        <div className="col-span-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Balance</p>
          <p className="text-3xl font-semibold">{formatRupiah(balance)}</p>
          <p className="text-xs opacity-60 mt-2">Total deposit: {formatRupiah(totalDeposit)}</p>
        </div>

        {/* Orders */}
        <div className="rounded-2xl bg-slate-900 border border-white/6 p-4">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">Orders</p>
          <p className="text-2xl font-semibold text-slate-100 mt-0.5">{totalOrder.toLocaleString("id-ID")}</p>
        </div>

        {/* Success Rate */}
        <div className="rounded-2xl bg-slate-900 border border-white/6 p-4">
          <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">Success</p>
          <p className="text-2xl font-semibold text-slate-100 mt-0.5">{successRate}%</p>
        </div>
      </div>

      {/* Membership Card */}
      <div className={`rounded-2xl bg-gradient-to-r border p-4 ${TIER_BG[role] ?? TIER_BG.bronze}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Membership</p>
            <p className={`text-xl font-semibold capitalize mt-0.5 ${TIER_COLORS[role]}`}>
              {role}
            </p>
          </div>
          {tierProgress.next && (
            <div className="text-right">
              <p className="text-xs text-slate-500">Menuju</p>
              <p className="text-sm font-medium text-slate-300">{tierProgress.next}</p>
            </div>
          )}
        </div>

        {tierProgress.next ? (
          <>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all"
                style={{ width: `${tierProgress.percent}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <p className="text-xs text-slate-500">{tierProgress.current} order</p>
              <p className="text-xs text-slate-500">{tierProgress.percent}% → {tierProgress.target} order</p>
            </div>
          </>
        ) : (
          <p className="text-xs text-slate-400">🏆 Kamu sudah di tier tertinggi!</p>
        )}
      </div>

      {/* Platform List */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-200">Platform OTP</h3>
          <span className="text-xs text-slate-500">{services.length} tersedia</span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari platform..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-white/6 rounded-xl text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-sky-500/40 transition"
          />
        </div>

        {/* List */}
        <div className="space-y-2">
          {filteredServices.length === 0 ? (
            <div className="text-center py-8 text-slate-600 text-sm">
              {services.length === 0
                ? "Belum ada platform. Admin perlu sync provider dulu."
                : "Platform tidak ditemukan."}
            </div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service._id}
                className="flex items-center justify-between px-4 py-3 bg-slate-900 border border-white/6 rounded-xl hover:border-white/12 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl">
                    {getPlatformIcon(service.name)}
                  </div>
                  <div>
                    <p className="text-sm text-slate-200 font-medium">{service.name}</p>
                    <p className="text-xs text-slate-500">{service.code || "OTP"}</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
