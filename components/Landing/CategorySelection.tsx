
import Link from "next/link";
import {
    ArrowRight,
    Camera,
    Clapperboard,
    Mic2,
    Music2,
    Palette,
} from "lucide-react";

const categories = [
    {
        name: "Photo Studios",
        value: "Photo Studios",
        description: "Perfect spaces for portraits, fashion, and product photography.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
        icon: Camera,
    },
    {
        name: "Sound Stages",
        value: "Sound Stages",
        description: "Professional spaces for films, commercials, and video production.",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
        icon: Clapperboard,
    },
    {
        name: "Podcast Rooms",
        value: "Podcast Rooms",
        description: "Record conversations, interviews, and your next big idea.",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
        icon: Mic2,
    },
    {
        name: "Music Suites",
        value: "Music Suites",
        description: "Create, rehearse, and record your next musical project.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
        icon: Music2,
    },
    {
        name: "Art Workshops",
        value: "Art Workshops",
        description: "Inspiring spaces for painting, crafts, and collaboration.",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
        icon: Palette,
    },
];

const CategorySection = () => {
    return (
        <section className="bg-base-100 px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-10 text-center">
                    <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
                        Find your creative space
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
                        Browse by Category
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-base-content/65">
                        Whatever you're creating, discover a space designed
                        to bring your ideas to life.
                    </p>
                </div>

                {/* Category cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">

                    {categories.map((category, index) => {
                        const Icon = category.icon;

                        return (
                            <Link
                                key={category.name}
                                href={`/studios?category=${encodeURIComponent(category.value)}`}
                                className={`group relative isolate flex min-h-64 flex-col justify-end overflow-hidden rounded-2xl border border-base-300 bg-base-300 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-72 ${
                                    index < 2 ? "lg:col-span-3" : "lg:col-span-2"
                                }`}
                            >
                                {/* Background image */}
                                <div
                                    className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `url("${category.image}")`,
                                    }}
                                />

                                {/* Dark overlay */}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />

                                {/* Content */}
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                                            <Icon size={21} />
                                        </div>

                                        <h3 className="text-xl font-bold text-white sm:text-2xl">
                                            {category.name}
                                        </h3>

                                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">
                                            {category.description}
                                        </p>
                                    </div>

                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content transition-transform duration-300 group-hover:translate-x-1">
                                        <ArrowRight size={19} />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};

export default CategorySection;
