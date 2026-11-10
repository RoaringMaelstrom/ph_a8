"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import StudioCard, { Studio } from "../Card/StudioCard";
import StudioFilters from "./StudioFilters";
interface StudioListingProps {
    studios: Studio[];
    hasError: boolean;
}

const StudioListing = ({ studios, hasError }: StudioListingProps) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState<"high-to-low" | "low-to-high">(
        "high-to-low"
    );

    const filteredStudios = useMemo(() => {
        let result = [...studios];

        // Filter by category
        if (selectedCategory) {
            result = result.filter(
                (studio) => studio.category === selectedCategory
            );
        }

        // Sort by rating
        result.sort((a, b) => {
            if (a.rating == null) return 1;
            if (b.rating == null) return -1;

            return sortOrder === "high-to-low"
                ? b.rating - a.rating
                : a.rating - b.rating;
        });

        return result;
    }, [studios, selectedCategory, sortOrder]);

    return (
        <main className="min-h-screen bg-base-100">
            {/* Page heading */}
            <section className="border-b border-base-300 bg-base-200">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                        Explore StudioSpace
                    </p>

                    <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-base-content sm:text-5xl">
                        Find the perfect space for your next creation.
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-relaxed text-base-content/65 sm:text-lg">
                        Discover creative studios, production spaces, and inspiring
                        environments for your next project.
                    </p>
                </div>
            </section>

            {/* Listings */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-base-content">
                            Available Studios
                        </h2>

                        <p className="mt-1 text-sm text-base-content/60">
                            {filteredStudios.length}{" "}
                            {filteredStudios.length === 1 ? "studio" : "studios"} found
                        </p>
                    </div>

                    <StudioFilters
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        sortOrder={sortOrder}
                        onSortChange={setSortOrder}
                    />
                </div>

                {hasError ? (
                    <div className="rounded-2xl border border-base-300 bg-base-200 px-6 py-16 text-center">
                        <h3 className="text-xl font-bold text-base-content">
                            Unable to load studios
                        </h3>
                        <p className="mt-2 text-sm text-base-content/60">
                            Please check your connection and try again later.
                        </p>
                    </div>
                ) : filteredStudios.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredStudios.map((studio) => (
                            <StudioCard key={studio._id} studio={studio} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-base-300 bg-base-200 px-6 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-base-300">
                            <Search size={24} className="text-base-content/60" />
                        </div>

                        <h3 className="text-xl font-bold text-base-content">
                            No studios found
                        </h3>

                        <p className="mt-2 text-sm text-base-content/60">
                            Try selecting a different category to see available studios.
                        </p>

                        <button
                            onClick={() => setSelectedCategory("")}
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                        >
                            <SlidersHorizontal size={15} />
                            Clear category filter
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
};

export default StudioListing;