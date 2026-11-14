import { ArrowLeft } from "lucide-react";

const BookingSkeleton = () => {
    return (
        <main
            className="min-h-screen bg-base-100"
            aria-busy="true"
            aria-label="Loading booking page"
        >
            <span className="sr-only">Loading booking page…</span>

            <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">

                {/* Back navigation */}
                <div className="mb-8 flex items-center gap-2">
                    <ArrowLeft size={16} className="text-base-content/30" />
                    <div className="h-4 w-28 rounded bg-base-300" />
                </div>

                {/* Page heading */}
                <div className="mb-8 space-y-3">
                    <div className="h-3 w-36 rounded bg-base-300" />
                    <div className="h-9 w-64 max-w-full rounded-lg bg-base-300" />
                    <div className="h-4 w-80 max-w-full rounded bg-base-300" />
                </div>

                <div className="grid items-start gap-8 lg:grid-cols-3">

                    {/* Booking form skeleton */}
                    <section className="space-y-7 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8 lg:col-span-2">

                        {/* Date selection */}
                        <div>
                            <div className="h-6 w-56 rounded bg-base-300" />
                            <div className="mt-2 h-4 w-72 max-w-full rounded bg-base-300" />

                            <div className="mt-5 flex h-12 items-center gap-3 rounded-xl border border-base-300 px-4">
                                <div className="h-5 w-5 rounded bg-base-300" />
                                <div className="h-4 w-36 rounded bg-base-300" />
                            </div>
                        </div>

                        <div className="divider" />

                        {/* Time selection */}
                        <div>
                            <div className="h-6 w-48 rounded bg-base-300" />
                            <div className="mt-2 h-4 w-64 max-w-full rounded bg-base-300" />

                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                {[1, 2].map((item) => (
                                    <div key={item}>
                                        <div className="mb-2 h-4 w-24 rounded bg-base-300" />
                                        <div className="h-12 rounded-lg border border-base-300 bg-base-200" />
                                    </div>
                                ))}
                            </div>

                            {/* Existing bookings */}
                            <div className="mt-5 rounded-xl bg-base-200 p-4">
                                <div className="mb-4 h-4 w-48 rounded bg-base-300" />
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2].map((item) => (
                                        <div
                                            key={item}
                                            className="h-9 w-28 rounded-lg bg-base-300"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="divider" />

                        {/* Price and confirmation */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-2">
                                <div className="h-4 w-36 rounded bg-base-300" />
                                <div className="h-8 w-28 rounded bg-base-300" />
                            </div>

                            <div className="h-12 w-full rounded-lg bg-base-300 sm:w-48" />
                        </div>
                    </section>

                    {/* Studio summary skeleton */}
                    <aside className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">

                        {/* Studio image */}
                        <div className="aspect-[16/10] bg-base-300" />

                        <div className="space-y-5 p-5">

                            {/* Studio information */}
                            <div className="space-y-3">
                                <div className="h-3 w-28 rounded bg-base-300" />
                                <div className="h-6 w-52 max-w-full rounded bg-base-300" />
                                <div className="h-4 w-40 rounded bg-base-300" />
                            </div>

                            <div className="divider my-0" />

                            {/* Studio details */}
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <div className="h-4 w-32 rounded bg-base-300" />
                                    <div className="h-4 w-20 rounded bg-base-300" />
                                </div>
                            ))}

                            {/* Booking notice */}
                            <div className="space-y-2 rounded-xl bg-base-200 p-4">
                                <div className="h-3 w-full rounded bg-base-300" />
                                <div className="h-3 w-5/6 rounded bg-base-300" />
                                <div className="h-3 w-2/3 rounded bg-base-300" />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default BookingSkeleton;
