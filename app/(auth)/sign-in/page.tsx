'use client'

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub, AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const SignInPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const { data: resData, error } = await signIn.email({
                email: String(data.email).trim(),
                password: data.password as string,
                rememberMe: true,
                callbackURL: '/'
            })

            if (error) {
                toast.error(error.message || "Failed to sign in.");
                return;
            }

            if (resData) {
                toast.success("You have successfully signed in");
            }

        } catch (error) {
            console.error("Unexpected sign-in error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        const { error } = await signIn.social({
            provider: "google",
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message as string);
            console.error("Google sign-in failed:", error);
            return;
        }

        toast.success("Google sign-in initiated");


    };

    const handleGithubSignIn = async () => {
        const { error } = await signIn.social({
            provider: "github",
            callbackURL: "/",
        });

        if (error) {
            toast.error("GitHub sign-in failed");
            console.error("GitHub sign-in failed:", error);
            return;
        }

        toast.success("GitHub sign-in initiated");
    };

    return (
        <div className="flex min-h-screen flex-col items-center text-center justify-center gap-4 py-6 md:py-0">
            <h1 className='font-bold text-3xl'>Sign In</h1>
            <h2 className='text-slate-600 w-[80%]'>Log in to your account to see detailed prices, market comparisons, and profiles</h2>

            <div className="fieldset bg-base-200 border-base-300 rounded-box w-auto border p-4">
                <form onSubmit={onSubmit}>
                    <fieldset className="w-auto flex flex-col">
                        <legend className="fieldset-legend"></legend>

                        <label className="label font-bold">Email</label>
                        <input required name="email" type="email" className="input w-full" placeholder="you@example.com" autoComplete="email" />

                        <label className="label font-bold">Password</label>
                        <input required name="password" type="password" className="input w-full" placeholder="Atleast 8 characters" autoComplete="current-password" />

                        <button disabled={isLoading} className="btn btn-neutral mt-4">{isLoading ? "Signing in..." : "Log in"}</button>
                    </fieldset>
                </form>

                <div className="divider">OR</div>
                <div className='flex flex-col md:flex-row gap-2'>
                    <button onClick={() => handleGoogleSignIn()} disabled={isLoading} className='btn btn-outline'><FcGoogle />Sign in with Google</button>
                    <button onClick={() => handleGithubSignIn()} disabled={isLoading} className='btn btn-outline border-stale-200'><AiFillGithub />Sign In with Github"</button>
                </div>
                <div className="text-center text-sm"><h1>Do not have an account? <Link href="/sign-up" scroll={false} className="text-green-700">Create an account</Link></h1></div>
            </div>

            <div className="text-slate-700 text-base">
                <Link href="/" className="flex items-center gap-2">
                    <AiOutlineArrowLeft />
                    <h3>return to home page</h3>
                </Link>
            </div>
        </div>
    );
};

export default SignInPage;