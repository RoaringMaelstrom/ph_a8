
'use client'

import { SiGoogle } from "@icons-pack/react-simple-icons";
import { MoveLeft } from "lucide-react";
import toast from "react-hot-toast";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn, signUp } from "@/lib/auth-client";

const SignUpPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (String(data.password) !== String(data.confirmPassword)) {
            toast.error("Passwords do not match");
            setIsSubmitting(false);
            return;
        }

        try {
            const { data: resData, error } = await signUp.email({
                name: String(data.name).trim(),
                email: String(data.email).trim(),
                password: data.password as string,
                callbackURL: '/',
            });

            if (error) {
                console.error(error);
                toast.error(error.message || "Failed to create account.");
                return;
            }

            if (resData) {
                toast.success("You have successfully created an account");
                router.replace("/");
            }
        } catch (error) {
            console.error("Unexpected sign-up error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                toast.error("Google sign-in failed");
                console.error("Google sign-in failed:", error);
                return;
            }

            toast.success("Google sign-in initiated");
        } catch (error) {
            console.error("Unexpected Google sign-in error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <main className="min-h-screen bg-base-200 px-4 py-12 sm:px-6 flex items-center justify-center">

            <div className="w-full max-w-md">

                {/* Sign-up card */}
                <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">

                    {/* Heading */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-base-content">
                            Create an Account
                        </h1>

                        <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                            Join StudioSpace and discover creative spaces,
                            book studios, or share your own workspace.
                        </p>
                    </div>

                    {/* Registration form */}
                    <form onSubmit={onSubmit} className="space-y-4">

                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-semibold text-base-content"
                            >
                                Full name
                            </label>

                            <input
                                id="name"
                                required
                                name="name"
                                type="text"
                                className="input input-bordered w-full bg-base-100 focus:border-primary focus:outline-none"
                                placeholder="For example: Jashim Uddin"
                                autoComplete="name"
                            />
                        </div>

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
                                placeholder="At least 8 characters"
                                autoComplete="new-password"
                                minLength={8}
                                pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}"
                                title="Password must contain at least 8 characters, including uppercase, lowercase, and a number."
                            />

                            <p className="text-xs text-base-content/55">
                                Use at least 8 characters, including uppercase,
                                lowercase, and a number.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="confirmPassword"
                                className="text-sm font-semibold text-base-content"
                            >
                                Confirm password
                            </label>

                            <input
                                id="confirmPassword"
                                required
                                name="confirmPassword"
                                type="password"
                                className="input input-bordered w-full bg-base-100 focus:border-primary focus:outline-none"
                                placeholder="Re-enter your password"
                                autoComplete="new-password"
                                minLength={8}
                            />
                        </div>

                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className="btn btn-primary mt-3 w-full border-none text-base font-semibold"
                        >
                            {isSubmitting ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="divider my-6 text-xs text-base-content/50">
                        OR CONTINUE WITH
                    </div>

                    {/* Google sign-up */}
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={isSubmitting}
                        className="btn btn-outline w-full border-base-300 bg-base-100 text-base-content hover:border-primary hover:bg-primary hover:text-primary-content"
                    >
                        <SiGoogle size={18} />
                        Continue with Google
                    </button>

                    {/* Sign-in link */}
                    <p className="mt-7 text-center text-sm text-base-content/70">
                        Already have an account?{" "}
                        <Link
                            href="/sign-in"
                            scroll={false}
                            className="font-semibold text-primary hover:text-secondary hover:underline"
                        >
                            Sign in
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

export default SignUpPage;
