
import { ArrowLeft } from "lucide-react";

const StudioEditLoading = () => {
    return (
        <main className="min-h-screen bg-base-100">
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">

                {/* Back Navigation */}
                <div className="mb-8 flex items-center gap-2">
                    <ArrowLeft size={17} className="text-base-content/40" />
                    <div className="h-4 w-28 animate-pulse rounded bg-base-300" />
                </div>

                {/* Page Heading */}
                <div className="mb-9 space-y-3">
                    <div className="h-9 w-64 animate-pulse rounded-lg bg-base-300" />
                    <div className="h-4 w-80 max-w-full animate-pulse rounded bg-base-300" />
                </div>

                {/* Form Container */}
                <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">

                    <div className="space-y-8">

                        {/* Basic Information */}
                        <section className="space-y-5">
                            <div className="h-6 w-44 animate-pulse rounded bg-base-300" />

                            {/* Studio Title */}
                            <div className="space-y-2">
                                <div className="h-4 w-28 animate-pulse rounded bg-base-300" />
                                <div className="h-12 w-full animate-pulse rounded-lg bg-base-200" />
                            </div>

                            {/* Category and Hourly Rate */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {[1, 2].map((item) => (
                                    <div key={item} className="space-y-2">
                                        <div className="h-4 w-28 animate-pulse rounded bg-base-300" />
                                        <div className="h-12 w-full animate-pulse rounded-lg bg-base-200" />
                                    </div>
                                ))}
                            </div>

                            {/* Security Deposit and Capacity */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {[1, 2].map((item) => (
                                    <div key={item} className="space-y-2">
                                        <div className="h-4 w-32 animate-pulse rounded bg-base-300" />
                                        <div className="h-12 w-full animate-pulse rounded-lg bg-base-200" />
                                    </div>
                                ))}
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <div className="h-4 w-20 animate-pulse rounded bg-base-300" />
                                <div className="h-12 w-full animate-pulse rounded-lg bg-base-200" />
                            </div>
                        </section>

                        <div className="divider" />

                        {/* Studio Description */}
                        <section className="space-y-5">
                            <div className="h-6 w-40 animate-pulse rounded bg-base-300" />

                            <div className="space-y-2">
                                <div className="h-4 w-28 animate-pulse rounded bg-base-300" />
                                <div className="h-36 w-full animate-pulse rounded-lg bg-base-200" />
                            </div>
                        </section>

                        <div className="divider" />

                        {/* Studio Image */}
                        <section className="space-y-5">
                            <div className="h-6 w-36 animate-pulse rounded bg-base-300" />

                            <div className="space-y-2">
                                <div className="h-4 w-28 animate-pulse rounded bg-base-300" />

                                <div className="aspect-video w-full animate-pulse rounded-xl bg-base-200" />
                            </div>
                        </section>

                        <div className="divider" />

                        {/* Amenities */}
                        <section className="space-y-5">
                            <div className="h-6 w-28 animate-pulse rounded bg-base-300" />
                            <div className="h-4 w-64 max-w-full animate-pulse rounded bg-base-300" />

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="h-5 w-5 animate-pulse rounded border border-base-300 bg-base-200" />
                                        <div className="h-4 w-36 max-w-full animate-pulse rounded bg-base-300" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="divider" />

                        {/* Form Actions */}
                        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <div className="h-12 w-full animate-pulse rounded-lg bg-base-200 sm:w-28" />
                            <div className="h-12 w-full animate-pulse rounded-lg bg-base-300 sm:w-40" />
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default StudioEditLoading;
