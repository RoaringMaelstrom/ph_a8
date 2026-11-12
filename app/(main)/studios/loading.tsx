
import { ArrowLeft } from "lucide-react";

const StudiosLoading = () => {
    return (
        <main className="min-h-screen bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Page Heading */}
                <div className="mb-9 space-y-3">
                    <div className="h-9 w-64 animate-pulse rounded-lg bg-base-300" />
                    <div className="h-4 w-80 max-w-full animate-pulse rounded bg-base-300" />
                </div>

                {/* Search and Filters */}
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* Search Bar */}
                    <div className="h-12 w-full animate-pulse rounded-xl bg-base-200 lg:max-w-sm" />

                    {/* Filter Controls */}
                    <div className="flex flex-wrap gap-3">
                        <div className="h-11 w-32 animate-pulse rounded-lg bg-base-200" />
                        <div className="h-11 w-32 animate-pulse rounded-lg bg-base-200" />
                        <div className="h-11 w-28 animate-pulse rounded-lg bg-base-200" />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="mb-8 flex gap-3 overflow-hidden">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-10 w-28 shrink-0 animate-pulse rounded-full bg-base-200"
                        />
                    ))}
                </div>

                {/* Results Heading */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="h-6 w-36 animate-pulse rounded bg-base-300" />
                    <div className="h-4 w-24 animate-pulse rounded bg-base-300" />
                </div>

                {/* Studio Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {Array.from({ length: 9 }).map((_, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-base-300 bg-base-100"
                        >
                            {/* Studio Image */}
                            <div className="aspect-[4/3] animate-pulse bg-base-200" />

                            {/* Card Content */}
                            <div className="space-y-4 p-5">

                                {/* Category and Rating */}
                                <div className="flex items-center justify-between">
                                    <div className="h-5 w-28 animate-pulse rounded-full bg-base-300" />
                                    <div className="h-4 w-12 animate-pulse rounded bg-base-300" />
                                </div>

                                {/* Studio Title */}
                                <div className="h-6 w-3/4 animate-pulse rounded bg-base-300" />

                                {/* Location */}
                                <div className="h-4 w-2/3 animate-pulse rounded bg-base-200" />

                                {/* Studio Details */}
                                <div className="flex gap-4">
                                    <div className="h-4 w-24 animate-pulse rounded bg-base-200" />
                                    <div className="h-4 w-24 animate-pulse rounded bg-base-200" />
                                </div>

                                {/* Price and Button */}
                                <div className="flex items-center justify-between border-t border-base-300 pt-4">
                                    <div className="space-y-2">
                                        <div className="h-3 w-16 animate-pulse rounded bg-base-200" />
                                        <div className="h-6 w-24 animate-pulse rounded bg-base-300" />
                                    </div>
                                    <div className="h-10 w-24 animate-pulse rounded-lg bg-base-300" />
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </main>
    );
};

export default StudiosLoading;
