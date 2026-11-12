
import { ArrowLeft } from "lucide-react";

const StudioDetailsLoading = () => {
    return (
        <main className="min-h-screen bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Back Navigation */}
                <div className="mb-7 flex items-center gap-2 text-sm text-base-content/40">
                    <ArrowLeft size={17} />
                    <div className="h-4 w-28 animate-pulse rounded bg-base-300" />
                </div>

                {/* Studio Heading */}
                <div className="mb-7 space-y-4">
                    <div className="h-6 w-28 animate-pulse rounded-full bg-base-300" />
                    <div className="h-9 w-2/3 max-w-md animate-pulse rounded-lg bg-base-300" />

                    <div className="flex gap-4">
                        <div className="h-4 w-36 animate-pulse rounded bg-base-300" />
                        <div className="h-4 w-24 animate-pulse rounded bg-base-300" />
                    </div>
                </div>

                {/* Cover Image */}
                <div className="aspect-[16/9] animate-pulse rounded-2xl bg-base-300 sm:aspect-[21/9]" />

                {/* Main Content */}
                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">

                    {/* Studio Information */}
                    <div className="space-y-10 lg:col-span-2">

                        {/* Overview */}
                        <section className="space-y-4">
                            <div className="h-6 w-44 animate-pulse rounded bg-base-300" />
                            <div className="space-y-3">
                                <div className="h-4 w-full animate-pulse rounded bg-base-300" />
                                <div className="h-4 w-full animate-pulse rounded bg-base-300" />
                                <div className="h-4 w-4/5 animate-pulse rounded bg-base-300" />
                            </div>
                        </section>

                        <div className="divider" />

                        {/* Studio Information */}
                        <section className="space-y-5">
                            <div className="h-6 w-48 animate-pulse rounded bg-base-300" />

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {[1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-4 rounded-xl border border-base-300 p-4"
                                    >
                                        <div className="h-12 w-12 animate-pulse rounded-lg bg-base-300" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-28 animate-pulse rounded bg-base-300" />
                                            <div className="h-4 w-24 animate-pulse rounded bg-base-300" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="divider" />

                        {/* Amenities */}
                        <section className="space-y-5">
                            <div className="h-6 w-56 animate-pulse rounded bg-base-300" />

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="h-5 w-5 animate-pulse rounded-full bg-base-300" />
                                        <div className="h-4 w-36 animate-pulse rounded bg-base-300" />
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Booking Panel */}
                    <aside>
                        <div className="rounded-2xl border border-base-300 p-6 shadow-sm lg:sticky lg:top-24">

                            <div className="h-4 w-24 animate-pulse rounded bg-base-300" />
                            <div className="mt-3 h-9 w-40 animate-pulse rounded bg-base-300" />

                            <div className="my-6 divider" />

                            <div className="space-y-5">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="flex justify-between gap-4"
                                    >
                                        <div className="h-4 w-28 animate-pulse rounded bg-base-300" />
                                        <div className="h-4 w-20 animate-pulse rounded bg-base-300" />
                                    </div>
                                ))}
                            </div>

                            <div className="my-6 divider" />

                            <div className="h-20 animate-pulse rounded-xl bg-base-200" />
                            <div className="mt-6 h-12 animate-pulse rounded-lg bg-base-300" />

                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
};

export default StudioDetailsLoading;
