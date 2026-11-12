
const SignInLoading = () => {
    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-base-100 px-4 py-12">
            <div className="w-full max-w-md">

                {/* Heading */}
                <div className="mb-8 space-y-3 text-center">
                    <div className="mx-auto h-9 w-48 animate-pulse rounded-lg bg-base-300" />
                    <div className="mx-auto h-4 w-64 max-w-full animate-pulse rounded bg-base-200" />
                </div>

                {/* Authentication Card */}
                <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">

                    {/* Google Sign In */}
                    <div className="h-12 w-full animate-pulse rounded-lg bg-base-200" />

                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-base-300" />
                        <div className="h-3 w-20 animate-pulse rounded bg-base-200" />
                        <div className="h-px flex-1 bg-base-300" />
                    </div>

                    {/* Email */}
                    <div className="mb-5 space-y-2">
                        <div className="h-4 w-16 animate-pulse rounded bg-base-300" />
                        <div className="h-12 w-full animate-pulse rounded-lg bg-base-200" />
                    </div>

                    {/* Password */}
                    <div className="mb-4 space-y-2">
                        <div className="h-4 w-20 animate-pulse rounded bg-base-300" />
                        <div className="h-12 w-full animate-pulse rounded-lg bg-base-200" />
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="h-4 w-24 animate-pulse rounded bg-base-200" />
                        <div className="h-4 w-28 animate-pulse rounded bg-base-200" />
                    </div>

                    {/* Submit Button */}
                    <div className="h-12 w-full animate-pulse rounded-lg bg-base-300" />

                    {/* Sign Up Link */}
                    <div className="mt-7 flex justify-center gap-2">
                        <div className="h-4 w-32 animate-pulse rounded bg-base-200" />
                        <div className="h-4 w-16 animate-pulse rounded bg-base-300" />
                    </div>
                </div>

            </div>
        </main>
    );
};

export default SignInLoading;