
"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

const getSnapshot = () => true;

const getServerSnapshot = () => false;

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();

    const mounted = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );

    if (!mounted) {
        return (
            <button
                type="button"
                aria-label="Change theme"
                className="btn btn-ghost btn-circle"
                disabled
            >
                <Sun size={20} />
            </button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="btn btn-ghost btn-circle text-base-content hover:bg-base-200"
        >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
