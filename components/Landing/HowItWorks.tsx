
import Link from "next/link";
import {
    Search,
    Clock3,
    CalendarCheck,
    Lightbulb,
    ArrowRight,
} from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Discover Spaces",
        description:
            "Explore creative studios and compare locations, facilities, and prices to find your ideal space.",
        icon: Search,
    },
    {
        number: "02",
        title: "Select Shoot Hours",
        description:
            "Choose the date, available time slots, and number of hours that fit your project.",
        icon: Clock3,
    },
    {
        number: "03",
        title: "Book Instantly",
        description:
            "Submit your booking request and coordinate with the studio host to confirm your reservation.",
        icon: CalendarCheck,
    },
    {
        number: "04",
        title: "Create & Produce",
        description:
            "Show up, use your chosen creative space, and focus on bringing your ideas to life.",
        icon: Lightbulb,
    },
];

const HowItWorks = () => {
    return (
        <section
            id="how-it-works"
            className="bg-base-200 px-4 py-16 sm:px-6 lg:py-20"
        >
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
                        Simple and straightforward
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
                        How Booking Works
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-base-content/65">
                        Finding and booking your next creative workspace
                        takes just four simple steps.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                                className="relative rounded-2xl border border-base-300 bg-base-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-7"
                            >
                                {/* Number and icon */}
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="text-3xl font-extrabold tracking-tight text-primary/35">
                                        {step.number}
                                    </span>

                                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Icon size={23} />
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-base-content">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                                    {step.description}
                                </p>

                                {/* Progress indicator */}
                                <div className="mt-7 flex gap-1.5">
                                    {steps.map((_, i) => (
                                        <span
                                            key={i}
                                            className={`h-1 rounded-full ${
                                                i === index
                                                    ? "w-8 bg-primary"
                                                    : "w-3 bg-base-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}

                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href="/studios"
                        className="btn btn-primary border-none px-7 font-semibold"
                    >
                        Find Your Studio
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
