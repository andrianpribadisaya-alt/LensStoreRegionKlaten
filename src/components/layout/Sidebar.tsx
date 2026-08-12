"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const menus = [
  { title: "Dashboard", href: "/dashboard", icon: "ti-layout-dashboard" },
  { title: "Deposit", href: "/dashboard/deposit", icon: "ti-wallet" },
  { title: "History", href: "/dashboard/history", icon: "ti-history" },
  { title: "Profile", href: "/dashboard/profile", icon: "ti-user" },
  { title: "Settings", href: "/dashboard/settings", icon: "ti-settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as any;

  return (
    <aside className="w-44 min-h-screen bg-[#0d1526] flex flex-col border-r border-white/[0.06] flex-shrink-0">
      <div className="px-4 py-4 border-b border-white/[0.06]">
        <span className="text-sm font-medium text-slate-100">
          Lens<span className="text-sky-400">Otp</span>
        </span>
      </div>

      <nav className="flex-1 py-2">
        {menus.map((m) => {
          const isActive = pathname === m.href || (m.href !== "/dashboard" && pathname.startsWith(m.href));
          return (
            <Link key={m.href} href={m.href}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-sm border-l-2 transition-all ${
                isActive
                  ? "text-slate-100 bg-sky-500/8 border-sky-400"
                  : "text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/3"
              }`}>
              <i className={`ti ${m.icon} text-base`} />
              {m.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/[0.06] space-y-1">
        {/* Tombol Admin Panel (hanya muncul kalau role admin) */}
        {user?.role === "admin" && (
          <Link href="/admin"
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-sky-400 hover:bg-sky-500/10 rounded-lg transition">
            <i className="ti ti-shield text-sm" />
            Admin Panel
          </Link>
        )}
        {/* Logout */}
        <button onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition">
          <i className="ti ti-logout text-base" />
          Logout
        </button>
      </div>
    </aside>
  );
}
