"use client";

import { useState } from "react";
import { Check, ChevronDown, SlidersHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export const categories = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Art Workshop",
];

interface StudioFiltersProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sortOrder: "high-to-low" | "low-to-high";
    onSortChange: (order: "high-to-low" | "low-to-high") => void;
}

const StudioFilters = ({
    selectedCategory,
    onCategoryChange,
    sortOrder,
    onSortChange,
}: StudioFiltersProps) => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Category filter */}
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                <PopoverTrigger
                    render={
                        <Button
                            variant="outline"
                            className="h-10 gap-2 rounded-xl border-base-300 bg-base-100 text-base-content hover:bg-base-200"
                        />
                    }
                >
                    <SlidersHorizontal size={16} />
                    {selectedCategory || "All Categories"}
                    <ChevronDown size={15} />
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    className="w-56 rounded-xl border-base-300 bg-base-100 p-2"
                >
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                        Filter by category
                    </p>

                    <button
                        onClick={() => {
                            onCategoryChange("");
                            setCategoryOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-base-content hover:bg-base-200"
                    >
                        All Categories
                        {!selectedCategory && <Check size={16} className="text-primary" />}
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                onCategoryChange(category);
                                setCategoryOpen(false);
                            }}
                            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-base-content hover:bg-base-200"
                        >
                            {category}
                            {selectedCategory === category && (
                                <Check size={16} className="text-primary" />
                            )}
                        </button>
                    ))}
                </PopoverContent>
            </Popover>

            {/* Rating sort */}
            <Popover open={sortOpen} onOpenChange={setSortOpen}>
                <PopoverTrigger
                    render={
                        <Button
                            variant="outline"
                            className="h-10 gap-2 rounded-xl border-base-300 bg-base-100 text-base-content hover:bg-base-200"
                        />
                    }
                >
                    <ArrowUpDown size={16} />
                    Rating: {sortOrder === "high-to-low" ? "High to Low" : "Low to High"}
                    <ChevronDown size={15} />
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    className="w-48 rounded-xl border-base-300 bg-base-100 p-2"
                >
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-base-content/50">
                        Sort by rating
                    </p>

                    <button
                        onClick={() => {
                            onSortChange("high-to-low");
                            setSortOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-base-content hover:bg-base-200"
                    >
                        High to Low
                        {sortOrder === "high-to-low" && (
                            <Check size={16} className="text-primary" />
                        )}
                    </button>

                    <button
                        onClick={() => {
                            onSortChange("low-to-high");
                            setSortOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-base-content hover:bg-base-200"
                    >
                        Low to High
                        {sortOrder === "low-to-high" && (
                            <Check size={16} className="text-primary" />
                        )}
                    </button>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default StudioFilters;