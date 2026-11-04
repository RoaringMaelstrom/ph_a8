
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState } from "react";
import {
    Menu,
    X,
    ChevronDown,
    LayoutDashboard,
    PlusCircle,
    Building2,
    CalendarDays,
    LogOut,
    UserRound,
} from "lucide-react";

type NavbarProps = {
    user?: {
        name: string;
        image?: string | null;
    } | null;
    onLogout?: () => void;
};

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about" },
];

const dashboardLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Add New Studio",
        href: "/add-studio",
        icon: PlusCircle,
    },
    {
        name: "My Studio Listings",
        href: "/my-listings",
        icon: Building2,
    },
    {
        name: "My Bookings",
        href: "/my-bookings",
        icon: CalendarDays,
    },
];

export default function Navbar({
    user = null,
    onLogout,
}: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const closeMobileMenu = () => setMobileOpen(false);

    const pathname = usePathname();
    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#EAE8E3] bg-[#FAF9F6]/95 backdrop-blur-md">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex shrink-0 items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F06435] text-xl font-bold text-white">
                        S
                    </div>

                    <span className="text-xl font-bold tracking-tight text-[#242424] sm:text-2xl">
                        Studio<span className="text-[#F06435]">Space</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-7 lg:flex">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === "/"
                                ? pathname === "/"
                                : pathname === link.href ||
                                pathname.startsWith(link.href + "/");
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? "bg-orange-50 text-[#F06435]"
                                    : "text-[#555555] hover:bg-orange-50 hover:text-[#F06435]"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-4 lg:flex">

                    {!user ? (
                        <>
                            <Link
                                href="/sign-in"
                                className="text-sm font-semibold text-[#444444] transition hover:text-[#F06435]"
                            >
                                Login
                            </Link>

                            <Link
                                href="/sign-up"
                                className="rounded-lg bg-[#F06435] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D94C25]"
                            >
                                Host Your Space
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/add-studio"
                                className="rounded-lg bg-[#F06435] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D94C25]"
                            >
                                + Host Your Space
                            </Link>

                            {/* User Dropdown */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    aria-expanded={userMenuOpen}
                                    className="flex items-center gap-2 rounded-full border border-[#EAE8E3] bg-white p-1.5 pr-3 transition hover:border-[#F06435]"
                                >
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt=""
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-[#F06435]">
                                            <UserRound size={19} />
                                        </div>
                                    )}

                                    <span className="max-w-28 truncate text-sm font-semibold text-[#333333]">
                                        {user.name}
                                    </span>

                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-500 transition ${userMenuOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 top-14 w-60 rounded-xl border border-[#EAE8E3] bg-white p-2 shadow-xl">
                                        <div className="border-b border-gray-100 px-3 py-3">
                                            <p className="text-sm font-semibold text-[#242424]">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Welcome to StudioSpace
                                            </p>
                                        </div>

                                        {dashboardLinks.map((link) => {
                                            const Icon = link.icon;

                                            return (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    onClick={() => setUserMenuOpen(false)}
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-orange-50 hover:text-[#F06435]"
                                                >
                                                    <Icon size={17} />
                                                    {link.name}
                                                </Link>
                                            );
                                        })}

                                        <div className="my-1 border-t border-gray-100" />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setUserMenuOpen(false);
                                                onLogout?.();
                                            }}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                                        >
                                            <LogOut size={17} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-[#242424] transition hover:bg-orange-50 lg:hidden"
                >
                    {mobileOpen ? <X size={25} /> : <Menu size={25} />}
                </button>
            </nav>

            {/* Mobile Navigation */}
            {mobileOpen && (
                <div className="border-t border-[#EAE8E3] bg-[#FAF9F6] px-5 pb-6 pt-4 shadow-lg lg:hidden">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={closeMobileMenu}
                                className="rounded-lg px-3 py-3 text-sm font-medium text-[#444444] transition hover:bg-orange-50 hover:text-[#F06435]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="my-4 border-t border-[#EAE8E3]" />

                    {!user ? (
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/login"
                                onClick={closeMobileMenu}
                                className="rounded-lg border border-[#F06435] px-4 py-3 text-center text-sm font-semibold text-[#F06435]"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                onClick={closeMobileMenu}
                                className="rounded-lg bg-[#F06435] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#D94C25]"
                            >
                                Host Your Space
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-3 flex items-center gap-3 px-2">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt=""
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-[#F06435]">
                                        <UserRound size={20} />
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm font-semibold text-[#242424]">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">My Account</p>
                                </div>
                            </div>

                            {dashboardLinks.map((link) => {
                                const Icon = link.icon;

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-600 transition hover:bg-orange-50 hover:text-[#F06435]"
                                    >
                                        <Icon size={18} />
                                        {link.name}
                                    </Link>
                                );
                            })}

                            <button
                                type="button"
                                onClick={() => {
                                    closeMobileMenu();
                                    onLogout?.();
                                }}
                                className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-600 transition hover:bg-red-50"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
