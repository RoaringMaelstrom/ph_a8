'use client'

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub, AiOutlineArrowLeft } from "react-icons/ai";
import toast from "react-hot-toast";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn, signUp } from "@/lib/auth-client";


const SignUpPage = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (String(data.password) !== String(data.confirmPassword)) {
            toast.error("Passwords do not match");
            setIsSubmitting(false);
            return
        }

        try {
            const { data: resData, error } = await signUp.email({
                name: String(data.name).trim(),
                email: String(data.email).trim(),
                password: data.password as string,
                callbackURL: '/',
            });

            if (resData) {
                toast.success("You have successfully created an account");
                router.replace("/");
            }

            if (error) {
                console.error(error)
                toast.error(error.message as string)
            }

        } catch (error) {
            console.error("Unexpected sign-up error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false)
        }
    };

    const handleGoogleSignIn = async () => {
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
            <h1 className='font-bold text-3xl'>Create an Account</h1>
            <h2 className='text-slate-600 w-[80%]'>Sign up for free and see all the detailed prices</h2>

            <div className="fieldset bg-base-200 border-base-300 rounded-box w-auto border p-4">
                <form onSubmit={onSubmit} >
                    <fieldset className="w-auto flex flex-col">
                        <legend className="fieldset-legend"></legend>

                        <label className="label font-bold">Name</label>
                        <input required name="name" type="text" className="input w-full" placeholder="For example: Jashim Uddin" autoComplete="name" />

                        <label className="label font-bold">Email</label>
                        <input required name="email" type="email" className="input w-full" placeholder="you@example.com" autoComplete="email" />

                        <label className="label font-bold">Password</label>
                        <input required name="password" type="password" className="input w-full" placeholder="Atleast 8 characters" autoComplete="new-password" minLength={8}
                            pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}" />

                        <label className="label font-bold">Confirm password</label>
                        <input required name="confirmPassword" type="password" className="input w-full" placeholder="Atleast 8 characters" autoComplete="new-password" minLength={8}
                            pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}" />

                        <button disabled={isSubmitting} type="submit" className="btn btn-neutral mt-4">{isSubmitting ? "Submitting..." : "Sign Up"}</button>
                    </fieldset>
                </form>
                <div className="divider">OR</div>

                {/*Alternet Sign Up*/}
                <div className='flex flex-col md:flex-row gap-2'>
                    <button onClick={() => handleGoogleSignIn()} disabled={isSubmitting} className='btn btn-outline border-slate-200'><FcGoogle />Sign In with Google</button>
                    <button onClick={() => handleGithubSignIn()} disabled={isSubmitting} className='btn btn-outline border-slate-200'><AiFillGithub />Sign In with Github</button>
                </div>
                <div className="text-center text-sm"><h1>Have an account? <Link href="/sign-in" scroll={false} className="text-green-700">Sign Up</Link></h1></div>
            </div>

            <div className="text-slate-700 text-base">
                <Link href="/" className="flex items-center gap-2">
                    <AiOutlineArrowLeft />
                    <h3>return to home page</h3>
                </Link>
            </div>
        </div >
    );
};

export default SignUpPage;