"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    Users,
    Wallet,
    Settings,
    CreditCard,
    Bell,
    Shield,
    Package,
    BarChart3
} from "lucide-react";

const menus = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: Package
    },
    {
        title: "Pricing",
        href: "/admin/pricing",
        icon: BarChart3
    },
    {
        title: "Tokopay",
        href: "/admin/payment",
        icon: CreditCard
    },
    {
        title: "SMSCode",
        href: "/admin/provider",
        icon: Wallet
    },
    {
        title: "Announcement",
        href: "/admin/announcement",
        icon: Bell
    },
    {
        title: "Security",
        href: "/admin/security",
        icon: Shield
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings
    }
];

export default function AdminSidebar() {

    return (

        <aside className="w-72 bg-slate-950 border-r border-slate-800 min-h-screen">

            <div className="p-6">

                <h1 className="text-3xl font-bold text-white">

                    LensOtp

                </h1>

                <p className="text-slate-400 text-sm">

                    Admin Panel

                </p>

            </div>

            <nav className="px-3">

                {menus.map((menu) => (

                    <Link

                        key={menu.href}

                        href={menu.href}

                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800 transition"

                    >

                        <menu.icon size={20} />

                        {menu.title}

                    </Link>

                ))}

            </nav>

        </aside>

    );

}
