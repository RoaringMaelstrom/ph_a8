
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowRight, MapPin, Star } from "lucide-react";

interface Studio {
    _id: string;
    title: string;
    category: string;
    location: string;
    hourlyRate: number;
    image: string;
    rating?: number;
}

async function getFeaturedStudios(): Promise<Studio[]> {
    "use cache";
    cacheLife("days");

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/featured`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch featured studios");
    }

    return response.json();
}

const FeaturedSection = async () => {
    let studios: Studio[] = [];

    try {
        studios = await getFeaturedStudios();
    } catch (error) {
        console.error("Failed to fetch featured studios:", error);
    }

    return (
        <section className="bg-base-100 px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-7xl">

                {/* Section heading */}
                <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
                            Handpicked spaces
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
                            Featured Studios
                        </h2>

                        <p className="mt-3 max-w-xl text-base leading-relaxed text-base-content/65">
                            Explore inspiring creative spaces selected to
                            help you bring your next project to life.
                        </p>
                    </div>

                    <Link
                        href="/studios"
                        className="group inline-flex w-fit items-center gap-2 font-semibold text-primary transition-colors hover:text-secondary"
                    >
                        Explore all studios
                        <ArrowRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>

                {/* Studio cards */}
                {studios.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {studios.map((studio) => (
                            <Link
                                key={studio._id}
                                href={`/studios/${studio._id}`}
                                className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Studio image */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-base-300">
                                    <div
                                        role="img"
                                        aria-label={studio.title}
                                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{
                                            backgroundImage: `url("${studio.image}")`,
                                        }}
                                    />

                                    {/* Category */}
                                    <span className="absolute left-4 top-4 rounded-full bg-base-100/95 px-3 py-1.5 text-xs font-semibold text-base-content shadow-sm">
                                        {studio.category}
                                    </span>
                                </div>

                                {/* Studio information */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="line-clamp-1 text-lg font-bold text-base-content transition-colors group-hover:text-primary">
                                            {studio.title}
                                        </h3>

                                        {typeof studio.rating === "number" && (
                                            <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-base-content">
                                                <Star
                                                    size={15}
                                                    className="fill-amber-400 text-amber-400"
                                                />
                                                {studio.rating.toFixed(1)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Location */}
                                    <div className="mt-3 flex items-center gap-1.5 text-sm text-base-content/60">
                                        <MapPin size={16} className="shrink-0" />
                                        <span className="line-clamp-1">
                                            {studio.location}
                                        </span>
                                    </div>

                                    {/* Hourly rate */}
                                    <div className="mt-5 flex items-center justify-between border-t border-base-300 pt-4">
                                        <span className="text-sm text-base-content/60">
                                            Starting from
                                        </span>

                                        <p className="text-lg font-bold text-primary">
                                            ৳{studio.hourlyRate.toLocaleString("en-BD")}
                                            <span className="ml-1 text-xs font-medium text-base-content/60">
                                                / hour
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Empty state */
                    <div className="rounded-2xl border border-base-300 bg-base-200 px-6 py-16 text-center">
                        <h3 className="text-xl font-bold text-base-content">
                            No featured studios yet
                        </h3>

                        <p className="mt-2 text-sm text-base-content/60">
                            Check back soon to discover available creative spaces.
                        </p>

                        <Link
                            href="/studios"
                            className="btn btn-primary mt-6 border-none"
                        >
                            Explore studios
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedSection;
