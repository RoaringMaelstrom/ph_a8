import type { ReactNode } from "react";

const HeadingSkeleton = () => (
    <div className="mb-7 space-y-2">
        <div className="h-6 w-44 animate-pulse rounded bg-base-300" />
        <div className="h-4 w-72 max-w-full animate-pulse rounded bg-base-300" />
    </div>
);

const FieldSkeleton = ({ labelWidth = "w-32" }: { labelWidth?: string }) => (
    <div className="space-y-2">
        <div className={`h-4 ${labelWidth} animate-pulse rounded bg-base-300`} />
        <div className="h-12 w-full animate-pulse rounded-xl bg-base-200" />
    </div>
);

const CardSkeleton = ({ children }: { children: ReactNode }) => (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
        {children}
    </div>
);

const AddStudioLoading = () => {
    return (
        <main className="min-h-screen bg-base-200">
            {/* Page heading */}
            <section className="border-b border-base-300 bg-base-100">
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mb-6 h-4 w-32 animate-pulse rounded bg-base-300" />

                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 animate-pulse rounded-xl bg-base-300" />
                        <div className="space-y-2">
                            <div className="h-3 w-28 animate-pulse rounded bg-base-300" />
                            <div className="h-9 w-56 max-w-full animate-pulse rounded bg-base-300" />
                        </div>
                    </div>

                    <div className="mt-4 max-w-2xl space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-base-300" />
                        <div className="h-4 w-2/3 animate-pulse rounded bg-base-300" />
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="space-y-7">
                    {/* Basic information */}
                    <CardSkeleton>
                        <HeadingSkeleton />
                        <div className="space-y-5">
                            <FieldSkeleton labelWidth="w-32" />
                            <FieldSkeleton labelWidth="w-36" />
                            <div className="space-y-2">
                                <div className="h-4 w-40 animate-pulse rounded bg-base-300" />
                                <div className="h-36 w-full animate-pulse rounded-xl bg-base-200" />
                                <div className="ml-auto h-3 w-24 animate-pulse rounded bg-base-300" />
                            </div>
                        </div>
                    </CardSkeleton>

                    {/* Pricing and capacity */}
                    <CardSkeleton>
                        <HeadingSkeleton />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                            {[0, 1, 2].map((item) => (
                                <FieldSkeleton key={item} labelWidth="w-28" />
                            ))}
                        </div>
                    </CardSkeleton>

                    {/* Location and image */}
                    <CardSkeleton>
                        <HeadingSkeleton />
                        <div className="space-y-5">
                            <FieldSkeleton labelWidth="w-40" />
                            <div className="space-y-2">
                                <div className="h-4 w-36 animate-pulse rounded bg-base-300" />
                                <div className="h-12 w-full animate-pulse rounded-xl bg-base-200" />
                                <div className="h-3 w-64 max-w-full animate-pulse rounded bg-base-300" />
                            </div>
                        </div>
                    </CardSkeleton>

                    {/* Amenities */}
                    <CardSkeleton>
                        <HeadingSkeleton />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-12 animate-pulse rounded-xl bg-base-200"
                                />
                            ))}
                        </div>
                        <div className="mt-4 h-3 w-32 animate-pulse rounded bg-base-300" />
                    </CardSkeleton>

                    {/* Host information */}
                    <CardSkeleton>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-11 w-11 animate-pulse rounded-xl bg-base-300" />
                            <div className="space-y-2">
                                <div className="h-6 w-40 animate-pulse rounded bg-base-300" />
                                <div className="h-4 w-64 max-w-full animate-pulse rounded bg-base-300" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <FieldSkeleton labelWidth="w-24" />
                            <FieldSkeleton labelWidth="w-24" />
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="h-3 w-full animate-pulse rounded bg-base-300" />
                            <div className="h-3 w-2/3 animate-pulse rounded bg-base-300" />
                        </div>
                    </CardSkeleton>

                    {/* Submission */}
                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 h-5 w-5 shrink-0 animate-pulse rounded bg-primary/30" />
                            <div className="flex-1 space-y-2">
                                <div className="h-5 w-48 max-w-full animate-pulse rounded bg-base-300" />
                                <div className="h-4 w-full animate-pulse rounded bg-base-300/70" />
                                <div className="h-4 w-3/4 animate-pulse rounded bg-base-300/70" />
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <div className="h-12 w-24 animate-pulse rounded-xl bg-base-300" />
                            <div className="h-12 w-40 animate-pulse rounded-xl bg-base-300" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AddStudioLoading;
