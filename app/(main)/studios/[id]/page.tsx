
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import {
    MapPin,
    Users,
    Star,
    Clock,
    ShieldCheck,
    ArrowLeft,
    CheckCircle2,
    CalendarDays,
} from "lucide-react";

import StudioDetailsLoading from "./loading";

interface Studio {
    _id: string;
    title: string;
    category: string;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
    location: string;
    image: string;
    overview: string;
    amenities: string[];
    rating?: number | null;
    reviews?: number;
}

interface StudioDetailsPageProps {
    params: Promise<{ id: string }>;
}

const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(price);

async function getStudio(id: string): Promise<Studio | null> {
    "use cache";
    cacheLife("days");

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`
    );

    if (response.status === 404) {
        return null;
    }

    if (!response.ok) {
        throw new Error("Failed to fetch studio information.");
    }

    return response.json();
}

const StudioDetailsPage = ({ params }: StudioDetailsPageProps) => {
    return (
        <Suspense fallback={<StudioDetailsLoading />}>
            <StudioDetailsContent params={params} />
        </Suspense>
    );
};

const StudioDetailsContent = async ({
    params,
}: StudioDetailsPageProps) => {
    const { id } = await params;

    let studio: Studio | null = null;

    try {
        studio = await getStudio(id);
    } catch (error) {
        console.error("Studio details error:", error);

        return (
            <main className="min-h-screen bg-base-100 px-4 py-20">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-2xl font-bold">
                        Unable to load studio
                    </h1>
                    <p className="mt-3 text-base-content/60">
                        {`Something went wrong while retrieving this
                        studio's information. Please try again.`}
                    </p>
                    <Link
                        href="/studios"
                        className="btn btn-primary mt-6"
                    >
                        Explore Studios
                    </Link>
                </div>
            </main>
        );
    }

    if (!studio) notFound();

    return (
        <main className="min-h-screen bg-base-100">
            {/* Page Content */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Back Navigation */}
                <Link
                    href="/studios"
                    className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-base-content/60 transition hover:text-primary"
                >
                    <ArrowLeft size={17} />
                    Back to studios
                </Link>

                {/* Studio Heading */}
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {studio.category}
                        </span>

                        <h1 className="mt-3 text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
                            {studio.title}
                        </h1>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-base-content/60">
                            <span className="flex items-center gap-1.5">
                                <MapPin size={16} />
                                {studio.location}
                            </span>

                            {studio.rating != null && studio.rating > 0 && (
                                <span className="flex items-center gap-1.5">
                                    <Star
                                        size={16}
                                        className="fill-amber-400 text-amber-400"
                                    />
                                    <strong className="text-base-content">
                                        {studio.rating.toFixed(1)}
                                    </strong>
                                    <span>
                                        ({studio.reviews ?? 0} reviews)
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Cover Image */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-base-200 sm:aspect-[21/9]">
                    {studio.image ? (
                        <img
                            src={studio.image}
                            alt={studio.title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-base-content/40">
                            No studio image available
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">

                    {/* Studio Information */}
                    <div className="space-y-10 lg:col-span-2">

                        {/* Overview */}
                        <section>
                            <h2 className="text-xl font-bold text-base-content">
                                About this space
                            </h2>

                            <p className="mt-4 whitespace-pre-line text-base leading-8 text-base-content/70">
                                {studio.overview}
                            </p>
                        </section>

                        <div className="divider" />

                        {/* Studio Capacity */}
                        <section>
                            <h2 className="text-xl font-bold text-base-content">
                                Studio Information
                            </h2>

                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div className="flex items-center gap-4 rounded-xl border border-base-300 p-4">
                                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                        <Users size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-base-content/60">
                                            Maximum Capacity
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            {studio.maxCapacity} People
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 rounded-xl border border-base-300 p-4">
                                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                                        <Clock size={22} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-base-content/60">
                                            Rental Duration
                                        </p>
                                        <p className="mt-1 font-semibold">
                                            Hourly Booking
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </section>

                        <div className="divider" />

                        {/* Amenities */}
                        <section>
                            <h2 className="text-xl font-bold text-base-content">
                                What this studio offers
                            </h2>

                            <p className="mt-2 text-sm text-base-content/60">
                                Available facilities and amenities.
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                {studio.amenities?.map((amenity) => (
                                    <div
                                        key={amenity}
                                        className="flex items-center gap-3 text-base-content/80"
                                    >
                                        <CheckCircle2
                                            size={19}
                                            className="shrink-0 text-primary"
                                        />
                                        <span className="text-sm font-medium">
                                            {amenity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Booking Information Panel */}
                    <aside>
                        <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm lg:sticky lg:top-24">

                            <p className="text-sm text-base-content/60">
                                Starting from
                            </p>

                            <div className="mt-1 flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-base-content">
                                    {formatPrice(studio.hourlyRate)}
                                </span>
                                <span className="text-sm text-base-content/60">
                                    / hour
                                </span>
                            </div>

                            <div className="my-6 divider" />

                            {/* Pricing */}
                            <div className="space-y-4">
                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="text-base-content/60">
                                        Hourly Rate
                                    </span>
                                    <span className="font-semibold">
                                        {formatPrice(studio.hourlyRate)}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="text-base-content/60">
                                        Security Deposit
                                    </span>
                                    <span className="font-semibold">
                                        {formatPrice(studio.securityDeposit)}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-3 text-sm">
                                    <span className="text-base-content/60">
                                        Maximum Capacity
                                    </span>
                                    <span className="font-semibold">
                                        {studio.maxCapacity} People
                                    </span>
                                </div>
                            </div>

                            <div className="my-6 divider" />

                            {/* Booking Notice */}
                            <div className="flex gap-3 rounded-xl bg-base-200 p-4">
                                <ShieldCheck
                                    size={21}
                                    className="shrink-0 text-primary"
                                />
                                <div>
                                    <p className="text-sm font-semibold">
                                        Secure Booking
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-base-content/60">
                                        Your booking request will be
                                        submitted for confirmation.
                                    </p>
                                </div>
                            </div>

                            {/* Booking CTA */}
                            <Link
                                href={`/studios/${studio._id}/booking`}
                                className="btn btn-primary w-full"
                            >
                                Book This Studio
                            </Link>

                            <p className="mt-4 text-center text-xs text-base-content/50">
                                Sign in to continue with your booking.
                            </p>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
};

export default StudioDetailsPage;
