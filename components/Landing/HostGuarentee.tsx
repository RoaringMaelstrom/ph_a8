
import Link from "next/link";
import {
    ShieldCheck,
    BadgeCheck,
    Wrench,
    Headset,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

const guarantees = [
    {
        title: "Liability Protection",
        description:
            "Clear booking policies, documented reservations, and guidance to help hosts and creators understand their responsibilities.",
        icon: ShieldCheck,
    },
    {
        title: "Verified Profiles",
        description:
            "Build confidence through detailed studio listings, host information, and transparent booking details.",
        icon: BadgeCheck,
    },
    {
        title: "Equipment Safety",
        description:
            "Studio owners can clearly list available equipment, facilities, and usage guidelines before each booking.",
        icon: Wrench,
    },
    {
        title: "24/7 Host Support",
        description:
            "Get assistance with booking questions, studio arrangements, and communication with hosts.",
        icon: Headset,
    },
];

const HostGuarantee = () => {
    return (
        <section className="bg-base-100 px-4 py-16 sm:px-6 lg:py-20">
            <div className="mx-auto max-w-7xl">

                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

                    {/* Left: Content */}
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
                            Built around trust
                        </p>

                        <h2 className="max-w-xl text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
                            Better spaces.
                            <span className="text-primary">
                                {" "}Better creative experiences.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-relaxed text-base-content/65">
                            Great creative work starts with peace of mind.
                            StudioSpace helps connect creators and studio
                            owners through transparent listings, clear
                            booking information, and a supportive community.
                        </p>

                        {/* Key benefits */}
                        <div className="mt-8 space-y-4">
                            {[
                                "Transparent studio information",
                                "Clear booking policies and expectations",
                                "Direct communication with studio hosts",
                                "A community built for creative collaboration",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2
                                        size={20}
                                        className="mt-0.5 shrink-0 text-primary"
                                    />

                                    <p className="text-sm font-medium text-base-content/80">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/studios"
                                className="btn btn-primary border-none px-6"
                            >
                                Explore Studios
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                href="/register"
                                className="btn btn-outline border-base-300 px-6 text-base-content hover:border-primary hover:bg-primary hover:text-primary-content"
                            >
                                Join StudioSpace
                            </Link>
                        </div>
                    </div>

                    {/* Right: Guarantee cards */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        {guarantees.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-base-300 bg-base-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Icon size={24} />
                                    </div>

                                    <h3 className="text-lg font-bold text-base-content">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-relaxed text-base-content/65">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HostGuarantee;
