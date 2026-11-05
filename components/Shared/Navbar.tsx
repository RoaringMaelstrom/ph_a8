
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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
import ThemeToggle from "./ThemeToggle";

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
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Add New Studio", href: "/add-studio", icon: PlusCircle },
    { name: "My Studio Listings", href: "/my-listings", icon: Building2 },
    { name: "My Bookings", href: "/my-bookings", icon: CalendarDays },
];

export default function Navbar({
    user = null,
    onLogout,
}: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const pathname = usePathname();

    const closeMobileMenu = () => setMobileOpen(false);

    const isActive = (href: string) =>
        href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(href + "/");

    const navLinkClass = (href: string) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive(href)
            ? "bg-primary/10 text-primary"
            : "text-base-content/75 hover:bg-base-200 hover:text-primary"
        }`;

    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!userMenuOpen) return;

        const handleOutsideClick = (event: PointerEvent) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target as Node)
            ) {
                setUserMenuOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setUserMenuOpen(false);
                userMenuRef.current
                    ?.querySelector<HTMLButtonElement>("button")
                    ?.focus();
            }
        };

        document.addEventListener("pointerdown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [userMenuOpen]);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/95 backdrop-blur-md">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex shrink-0 items-center gap-2"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-xl font-bold text-primary-content">
                        S
                    </div>

                    <span className="text-xl font-bold tracking-tight text-base-content sm:text-2xl">
                        Studio<span className="text-primary">Space</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-2 xl:gap-4 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={navLinkClass(link.href)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">
                    {!user ? (
                        <>
                            <ThemeToggle />
                            <Link
                                href="/sign-in"
                                className="rounded-lg px-3 py-2 text-sm font-semibold text-base-content/80 transition hover:text-primary"
                            >
                                Login
                            </Link>

                            <Link
                                href="/sign-up"
                                className="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-content shadow-sm transition hover:bg-secondary"
                            >
                                Host Your Space
                            </Link>
                        </>
                    ) : (
                        <>
                            <ThemeToggle />
                            <Link
                                href="/add-studio"
                                className="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-content transition hover:bg-secondary"
                            >
                                + Host Your Space
                            </Link>

                            {/* Improved User Dropdown */}
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    type="button"
                                    onClick={() => setUserMenuOpen((prev) => !prev)}
                                    aria-expanded={userMenuOpen}
                                    aria-haspopup="menu"
                                    aria-controls="account-menu"
                                    aria-label="Open account menu"
                                    className="group flex max-w-56 items-center gap-2 rounded-full border border-base-300 bg-base-100 p-1.5 pr-3 transition-all duration-200 hover:border-primary/50 hover:bg-base-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
                                >
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt=""
                                            className="h-9 w-9 rounded-full object-cover ring-2 ring-base-200"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <UserRound size={19} />
                                        </div>
                                    )}

                                    <span className="max-w-32 truncate text-sm font-semibold text-base-content">
                                        {user.name}
                                    </span>

                                    <ChevronDown
                                        size={16}
                                        className={`shrink-0 text-base-content/60 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {userMenuOpen && (
                                    <div
                                        id="account-menu"
                                        role="menu"
                                        aria-label="Account navigation"
                                        className="absolute right-0 top-[calc(100%+12px)] z-50 w-72 overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-xl shadow-black/10"
                                    >
                                        {/* Profile Header */}
                                        <div className="flex items-center gap-3 bg-base-200/70 px-4 py-4">
                                            {user.image ? (
                                                <img
                                                    src={user.image}
                                                    alt=""
                                                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-base-100"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                                    <UserRound size={23} />
                                                </div>
                                            )}

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-bold text-base-content">
                                                    {user.name}
                                                </p>
                                                <p className="mt-0.5 text-xs text-base-content/60">
                                                    StudioSpace Account
                                                </p>
                                            </div>
                                        </div>

                                        {/* Dashboard Links */}
                                        <div className="p-2">
                                            <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-widest text-base-content/45">
                                                Workspace
                                            </p>

                                            {dashboardLinks.map((link) => {
                                                const Icon = link.icon;
                                                const active = isActive(link.href);

                                                return (
                                                    <Link
                                                        key={link.name}
                                                        href={link.href}
                                                        role="menuitem"
                                                        onClick={() => setUserMenuOpen(false)}
                                                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active
                                                            ? "bg-primary/10 font-semibold text-primary"
                                                            : "text-base-content/75 hover:bg-base-200 hover:text-primary"
                                                            }`}
                                                    >
                                                        <Icon size={18} className="shrink-0" />
                                                        <span>{link.name}</span>

                                                        {active && (
                                                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                                                        )}
                                                    </Link>
                                                );
                                            })}
                                        </div>

                                        {/* Logout */}
                                        <div className="border-t border-base-300 p-2">
                                            <button
                                                type="button"
                                                role="menuitem"
                                                onClick={() => {
                                                    setUserMenuOpen(false);
                                                    onLogout?.();
                                                }}
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-error transition-colors hover:bg-error/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </button>
                                        </div>
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
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base-content transition hover:bg-base-200 lg:hidden"
                >
                    {mobileOpen ? <X size={25} /> : <Menu size={25} />}
                </button>
            </nav>

            {/* Mobile and Tablet Navigation */}
            {mobileOpen && (
                <div className="border-t border-base-300 bg-base-100 px-4 pb-6 pt-4 shadow-lg sm:px-6 lg:hidden">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={closeMobileMenu}
                                className={navLinkClass(link.href) + " py-3"}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    
                    {/* Theme Toggle */}
                    <div className="mt-4 mx-4 flex items-center justify-between border-t border-base-300 pt-4">
                        <span className="text-sm font-medium text-base-content">
                            Appearance
                        </span>

                        <ThemeToggle />
                    </div>


                    <div className="my-4 border-t border-base-300" />

                    {!user ? (
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/sign-in"
                                onClick={closeMobileMenu}
                                className="rounded-lg border border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary/10"
                            >
                                Login
                            </Link>

                            <Link
                                href="/sign-up"
                                onClick={closeMobileMenu}
                                className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-content transition hover:bg-secondary"
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
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <UserRound size={20} />
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-base-content">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-base-content/60">
                                        My Account
                                    </p>
                                </div>
                            </div>

                            {dashboardLinks.map((link) => {
                                const Icon = link.icon;

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-base-content/75 transition hover:bg-primary/10 hover:text-primary"
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
                                className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-error transition hover:bg-error/10"
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
