"use client";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <h1 className="text-xl font-semibold text-white">
        Dashboard
      </h1>

      <div className="text-slate-300">
        Login Google
      </div>
    </header>
  );
}
