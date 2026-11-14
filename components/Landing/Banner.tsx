
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Sparkles } from "lucide-react";

const Banner = () => {
    return (
        <section className="overflow-hidden bg-base-200 px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-16">

                {/* Left: Content */}
                <div className="flex flex-col items-start">

                    {/* Eyebrow */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold tracking-wide text-primary sm:text-sm">
                        <Sparkles size={16} />
                        Your space. Your creativity.
                    </div>

                    {/* Main heading */}
                    <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-base-content sm:text-5xl lg:text-6xl">
                        Find the perfect space to{" "}
                        <span className="text-primary">
                            bring your ideas to life.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-base-content/70 sm:text-lg">
                        Discover and book inspiring creative spaces for
                        photography, filmmaking, music, podcasts, and more.
                        Your next great project starts with the right space.
                    </p>

                    {/* CTA buttons */}
                    <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

                        <Link
                            href="/studios"
                            className="btn btn-primary min-h-12 w-full gap-2 border-none px-7 text-base font-semibold shadow-sm transition-transform hover:-translate-y-0.5 sm:w-auto"
                        >
                            Explore Studios
                            <ArrowRight size={18} />
                        </Link>

                        <Link
                            href="/add-studio"
                            className="btn btn-outline min-h-12 w-full border-base-content/20 bg-base-100 px-7 text-base font-semibold text-base-content transition-all hover:border-primary hover:bg-primary hover:text-primary-content sm:w-auto"
                        >
                            List Your Space
                        </Link>

                    </div>

                    {/* Supporting text */}
                    <p className="mt-6 text-center text-xs leading-relaxed text-base-content/55 sm:text-left sm:text-sm">
                        For creators, by a community of creative spaces.
                    </p>
                </div>

                {/* Right: Hero image */}
                <div className="relative mx-auto w-full max-w-xl lg:ml-auto">

                    {/* Decorative background */}
                    <div className="absolute -right-2 -top-3 h-24 w-24 rounded-3xl bg-primary/15 sm:-right-4 sm:-top-5 sm:h-32 sm:w-32" />

                    {/* Image container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-base-300 bg-base-300 shadow-xl">

                        <Image
                            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
                            alt="A professional creative studio workspace"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />

                        {/* Image overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>

                    {/* Floating information card */}
                    <div className="relative z-10 mx-3 -mt-5 flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-3 shadow-xl sm:absolute sm:-bottom-6 sm:-left-6 sm:mx-0 sm:mt-0 sm:max-w-[calc(100%-1rem)] sm:p-4">

                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Play size={20} fill="currentColor" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-bold text-base-content">
                                Create something amazing
                            </p>

                            <p className="text-xs leading-relaxed text-base-content/60">
                                Find a space that inspires you
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;
