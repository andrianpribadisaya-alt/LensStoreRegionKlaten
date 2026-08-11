"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#0d1526] px-4 sticky top-0 z-10">
      <h1 className="text-sm font-medium text-slate-100">Dashboard</h1>

      <div className="flex items-center gap-2">
        {session ? (
          <>
            {(session.user as any)?.role === "admin" && (
              <Link href="/admin"
                className="text-xs px-3 py-1.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-lg hover:bg-sky-500/20 transition">
                Admin Panel
              </Link>
            )}
            <button onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-xs px-3 py-1.5 bg-white/5 text-slate-400 border border-white/10 rounded-lg hover:bg-white/10 transition">
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="text-xs px-3 py-1.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Login Google
          </button>
        )}
      </div>
    </header>
  );
}
