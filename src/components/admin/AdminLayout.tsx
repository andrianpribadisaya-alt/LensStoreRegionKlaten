"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { title: "Overview", href: "/admin", icon: "ti-layout-dashboard" },
  { title: "Users", href: "/admin/users", icon: "ti-users" },
  { title: "Transaksi", href: "/admin/transaksi", icon: "ti-arrows-exchange" },
  { title: "Kode Promo", href: "/admin/promo", icon: "ti-ticket" },
  { title: "Notifikasi", href: "/admin/notifikasi", icon: "ti-bell" },
  { title: "Settings", href: "/admin/settings", icon: "ti-settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#020817] flex flex-col">
      {/* Topbar */}
      <header className="bg-[#0d1526] border-b border-white/[0.06] px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
        <button
          onClick={() => setOpen(true)}
          className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex flex-col items-center justify-center gap-1 flex-shrink-0"
          aria-label="Menu"
        >
          <span className="block w-3.5 h-px bg-slate-400 rounded" />
          <span className="block w-3.5 h-px bg-slate-400 rounded" />
          <span className="block w-3.5 h-px bg-slate-400 rounded" />
        </button>
        <span className="text-sm font-medium text-slate-100 flex-1">
          Lens<span className="text-sky-400">Otp</span>
        </span>
        <span className="text-xs bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-md px-2 py-0.5">
          Admin
        </span>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-52 bg-[#0d1526] border-r border-white/[0.06] z-50 transition-transform duration-250 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.06]">
          <span className="text-sm font-medium text-slate-100">
            Lens<span className="text-sky-400">Otp</span>{" "}
            <span className="text-xs text-slate-500">admin</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="w-6 h-6 rounded-md bg-white/5 border border-white/8 flex items-center justify-center text-slate-500 hover:text-slate-300"
          >
            <i className="ti ti-x text-sm" />
          </button>
        </div>
        <nav className="py-2">
          {menus.map((m) => {
            const isActive = pathname === m.href || (m.href !== "/admin" && pathname.startsWith(m.href));
            return (
              <Link
                key={m.href}
                href={m.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 text-sm border-l-2 transition-all ${
                  isActive
                    ? "text-slate-100 bg-sky-500/8 border-sky-400"
                    : "text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/3"
                }`}
              >
                <i className={`ti ${m.icon} text-base`} />
                {m.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}
