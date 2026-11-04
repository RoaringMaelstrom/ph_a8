'use client'

import { signOut, updateUser, useSession } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const handleSignOut = async () => {
        await signOut({
            callbackURL: "/",
        });
    }

    const { data } = useSession();
    const user = data?.user;
    
    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries())

        const { error} = await updateUser({
            name: String(userData.name).trim()
        })

        if (error) {
            toast.error(String(error));
            console.error("error updating data ", error)
        }

        toast.success("Successfully updated data")
    };

    return (

        <div className="flex min-h-screen flex-col items-center text-center justify-center gap-4 py-6 md:py-0">
            <h1 className='font-bold text-3xl md:w-md lg:w-lg md:text-left'>Your Profile</h1>
            <h2 className='text-slate-600 md:w-md lg:w-lg md:text-left text-sm'>See your account details now</h2>

            <div className="flex flex-col md:flex-row items-center gap-3 rounded-lg w-sm md:w-md lg:w-lg border border-base-300 bg-base-100 p-3">

                <div className="flex h-40 md:h-20 w-40 md:w-20 shrink-0 items-center justify-center rounded-lg bg-base-200 p-2">
                    <img
                        src={user?.image as string}
                        alt={`${user?.name} image`}
                        width={90}
                        height={90}
                        className="h-full w-full object-contain"
                    />
                </div>

                <div className="min-w-0 flex-1 flex-col gap-2 lg:text-left">
                    <h3 className="truncate font-semibold">
                        {user?.name}
                    </h3>

                    <p className="text-xs text-base-content/50">
                        {user?.email}
                    </p>
                </div>

                <button onClick={() => handleSignOut()} className="btn btn-error btn-outline">Sign Out</button>

            </div>

            <div className="fieldset bg-base-200 border-base-300 rounded-box w-sm md:w-md lg:w-lg border p-4">
                <h1 className="text-xl font-bold text-left">Information</h1>
                <form onSubmit={handleUpdateUser}>
                    <fieldset className="w-auto flex flex-col">
                        <legend className="fieldset-legend"></legend>

                        <label className="label font-bold">Name</label>
                        <input required name="name" type="text" className="input w-full" placeholder="For example: Jashim Uddin" autoComplete="name" />
                        <button type="submit" className="btn btn-neutral mt-4">Update</button>
                    </fieldset>
                </form>
            </div >
        </div>
    );
};
{/*  */ }
export default ProfilePage;