
'use client'

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

import { SiGoogle } from "@icons-pack/react-simple-icons";
import { MoveLeft } from "lucide-react";

const SignInPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const { data: resData, error } = await signIn.email({
                email: String(data.email).trim(),
                password: String(data.password),
                rememberMe: true,
                callbackURL: "/",
            });

            if (error) {
                console.error("Email sign-in failed:", error);
                toast.error(error.message || "Failed to sign in.");
                return;
            }

            if (resData) {
                toast.success("You have successfully signed in.");
            }
        } catch (error: unknown) {
            console.error("Unexpected email sign-in error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);

        try {
            const { error } = await signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                console.error("Google sign-in failed:", {
                    error,
                    details:
                        error instanceof Error
                            ? error.stack
                            : JSON.stringify(
                                error,
                                Object.getOwnPropertyNames(error)
                            ),
                });

                toast.error(error.message || "Google sign-in failed.");
                return;
            }

            // Better Auth handles the OAuth redirect.
            // No success toast is necessary here.
        } 
        finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-base-200 px-4 py-12 sm:px-6 flex items-center justify-center">

            <div className="w-full max-w-md">

                {/* Sign-in card */}
                <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">

                    {/* Heading */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-base-content">
                            Welcome back
                        </h1>

                        <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                            Log in to your account to list a studio, book your
                            place, and build your creative profile.
                        </p>
                    </div>

                    {/* Email and password form */}
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-base-content"
                            >
                                Email address
                            </label>

                            <input
                                id="email"
                                required
                                name="email"
                                type="email"
                                className="input input-bordered w-full bg-base-100 focus:border-primary focus:outline-none"
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-base-content"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                required
                                name="password"
                                type="password"
                                className="input input-bordered w-full bg-base-100 focus:border-primary focus:outline-none"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary mt-2 w-full border-none text-base font-semibold"
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider my-6 text-xs text-base-content/50">
                        OR CONTINUE WITH
                    </div>

                    {/* Google sign-in */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading || isLoading}
                        className="btn btn-outline w-full border-base-300 bg-base-100 text-base-content hover:border-primary hover:bg-primary hover:text-primary-content"
                    >
                        <SiGoogle size={18} />
                        {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
                    </button>

                    {/* Registration link */}
                    <p className="mt-7 text-center text-sm text-base-content/70">
                        {`Don't have an account?${" "}`}
                        <Link
                            href="/sign-up"
                            scroll={false}
                            className="font-semibold text-primary hover:text-secondary hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Back to home */}
                <div className="mt-7 flex justify-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium text-base-content/65 transition-colors hover:text-primary"
                    >
                        <MoveLeft size={18} />
                        Return to home page
                    </Link>
                </div>

            </div>
        </main>
    );
};

export default SignInPage;
