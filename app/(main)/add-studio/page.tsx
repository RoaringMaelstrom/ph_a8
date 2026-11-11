
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Camera,
    Check,
    ImagePlus,
    LoaderCircle,
    MapPin,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import { useSession, authClient } from "@/lib/auth-client";

const categories = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Art Workshop",
];

const availableAmenities = [
    "Air Conditioning",
    "High-Speed Wi-Fi",
    "Free Parking",
    "Lighting Equipment",
    "Soundproofing",
    "Professional Cameras",
    "Audio Equipment",
    "Makeup Room",
    "Changing Room",
    "Green Screen",
    "Kitchen",
    "Restroom",
];

interface StudioForm {
    title: string;
    category: string;
    hourlyRate: string;
    securityDeposit: string;
    maxCapacity: string;
    location: string;
    image: string;
    amenities: string[];
    overview: string;
}

const initialForm: StudioForm = {
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    maxCapacity: "",
    location: "",
    image: "",
    amenities: [],
    overview: "",
};

const AddStudioPage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [form, setForm] = useState<StudioForm>(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect unauthenticated users
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/sign-in");
        }
    }, [isPending, session, router]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAmenityChange = (amenity: string) => {
        setForm((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((item) => item !== amenity)
                : [...prev.amenities, amenity],
        }));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Show loading notification
        const toastId = toast.loading("Creating your studio...");

        try {
            // Retrieve JWT from Better Auth
            const { data, error } = await authClient.token();

            if (error || !data) {
                throw new Error("Authentication required. Please sign in again.");
            }

            // Send studio data to Express
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/studios`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.token}`,
                    },
                    body: JSON.stringify({
                        ...form,
                        hourlyRate: Number(form.hourlyRate),
                        securityDeposit: Number(form.securityDeposit),
                        maxCapacity: Number(form.maxCapacity),
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to create studio.");
            }

            // Replace loading notification with success
            toast.success("Studio created successfully!", {
                id: toastId,
            });

            // Redirect after successful creation
            router.push("/my-listings");

        } catch (error) {
            console.error("Studio creation failed:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong.",
                { id: toastId }
            );
        }
    };


    if (isPending || !session) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-base-100">
                <LoaderCircle className="animate-spin text-primary" size={32} />
            </main>
        );
    }

    const inputClass =
        "input input-bordered h-12 w-full rounded-xl border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:border-primary focus:outline-none";

    const labelClass =
        "mb-2 block text-sm font-semibold text-base-content";

    return (
        <main className="min-h-screen bg-base-200">
            {/* Page heading */}
            <section className="border-b border-base-300 bg-base-100">
                <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                    <Link
                        href="/dashboard"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-base-content/60 transition hover:text-primary"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Camera size={24} />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-primary">
                                HOST YOUR SPACE
                            </p>
                            <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
                                List Your Studio
                            </h1>
                        </div>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-base-content/60 sm:text-base">
                        Share your creative space with a community of creators.
                        Add your studio details, set your pricing, and start receiving
                        booking requests.
                    </p>
                </div>
            </section>

            {/* Form */}
            <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <form onSubmit={handleSubmit} className="space-y-7">

                    {/* Basic information */}
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
                        <div className="mb-7">
                            <h2 className="text-xl font-bold text-base-content">
                                Basic Information
                            </h2>
                            <p className="mt-1 text-sm text-base-content/55">
                                Tell creators what makes your studio special.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="title" className={labelClass}>
                                    Studio Title <span className="text-error">*</span>
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    minLength={3}
                                    maxLength={100}
                                    placeholder="e.g. Modern Photography Studio"
                                    value={form.title}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className={labelClass}>
                                    Studio Category <span className="text-error">*</span>
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    required
                                    value={form.category}
                                    onChange={handleChange}
                                    className="select select-bordered h-12 w-full rounded-xl border-base-300 bg-base-100 text-base-content focus:border-primary focus:outline-none"
                                >
                                    <option value="" disabled>
                                        Select a category
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="overview" className={labelClass}>
                                    Studio Overview <span className="text-error">*</span>
                                </label>
                                <textarea
                                    id="overview"
                                    name="overview"
                                    required
                                    minLength={20}
                                    maxLength={3000}
                                    rows={6}
                                    placeholder="Describe your studio, its atmosphere, facilities, ideal projects, and what creators can expect..."
                                    value={form.overview}
                                    onChange={handleChange}
                                    className="textarea textarea-bordered min-h-36 w-full resize-y rounded-xl border-base-300 bg-base-100 text-base-content placeholder:text-base-content/40 focus:border-primary focus:outline-none"
                                />
                                <p className="mt-2 text-right text-xs text-base-content/45">
                                    {form.overview.length}/3000 characters
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing and capacity */}
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
                        <div className="mb-7">
                            <h2 className="text-xl font-bold text-base-content">
                                Pricing & Capacity
                            </h2>
                            <p className="mt-1 text-sm text-base-content/55">
                                Set your studio rates and let creators know how many
                                people your space can accommodate.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                            <div>
                                <label htmlFor="hourlyRate" className={labelClass}>
                                    Hourly Rate ($) <span className="text-error">*</span>
                                </label>
                                <input
                                    id="hourlyRate"
                                    name="hourlyRate"
                                    type="number"
                                    required
                                    min="1"
                                    step="0.01"
                                    placeholder="45"
                                    value={form.hourlyRate}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="securityDeposit" className={labelClass}>
                                    Security Deposit ($) <span className="text-error">*</span>
                                </label>
                                <input
                                    id="securityDeposit"
                                    name="securityDeposit"
                                    type="number"
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="100"
                                    value={form.securityDeposit}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label htmlFor="maxCapacity" className={labelClass}>
                                    Max Capacity <span className="text-error">*</span>
                                </label>
                                <input
                                    id="maxCapacity"
                                    name="maxCapacity"
                                    type="number"
                                    required
                                    min="1"
                                    step="1"
                                    placeholder="10"
                                    value={form.maxCapacity}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location and image */}
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
                        <div className="mb-7">
                            <h2 className="text-xl font-bold text-base-content">
                                Location & Photos
                            </h2>
                            <p className="mt-1 text-sm text-base-content/55">
                                Help creators find your space and see what it looks like.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="location" className={labelClass}>
                                    Location / Address <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40"
                                    />
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        required
                                        placeholder="e.g. Gulshan, Dhaka, Bangladesh"
                                        value={form.location}
                                        onChange={handleChange}
                                        className={`${inputClass} pl-11`}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="image" className={labelClass}>
                                    Studio Image URL <span className="text-error">*</span>
                                </label>
                                <div className="relative">
                                    <ImagePlus
                                        size={18}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40"
                                    />
                                    <input
                                        id="image"
                                        name="image"
                                        type="url"
                                        required
                                        placeholder="https://example.com/your-studio-image.jpg"
                                        value={form.image}
                                        onChange={handleChange}
                                        className={`${inputClass} pl-11`}
                                    />
                                </div>
                                <p className="mt-2 text-xs text-base-content/45">
                                    Provide a publicly accessible image URL.
                                </p>
                            </div>

                            {form.image && (
                                <div className="overflow-hidden rounded-xl border border-base-300">
                                    <p className="border-b border-base-300 bg-base-200 px-4 py-2 text-xs font-semibold text-base-content/60">
                                        Image preview
                                    </p>
                                    <div
                                        className="aspect-video bg-cover bg-center bg-no-repeat"
                                        style={{ backgroundImage: `url("${form.image}")` }}
                                        role="img"
                                        aria-label="Studio image preview"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Amenities */}
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
                        <div className="mb-7">
                            <h2 className="text-xl font-bold text-base-content">
                                Studio Amenities
                            </h2>
                            <p className="mt-1 text-sm text-base-content/55">
                                Select the facilities and equipment available in your studio.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {availableAmenities.map((amenity) => {
                                const checked = form.amenities.includes(amenity);

                                return (
                                    <label
                                        key={amenity}
                                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 transition ${checked
                                            ? "border-primary/50 bg-primary/5"
                                            : "border-base-300 hover:bg-base-200"
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => handleAmenityChange(amenity)}
                                            className="checkbox checkbox-primary checkbox-sm"
                                        />
                                        <span className="text-sm font-medium text-base-content">
                                            {amenity}
                                        </span>
                                        {checked && (
                                            <Check size={15} className="ml-auto text-primary" />
                                        )}
                                    </label>
                                );
                            })}
                        </div>

                        <p className="mt-4 text-xs text-base-content/50">
                            {form.amenities.length} amenities selected
                        </p>
                    </div>

                    {/* Host information */}
                    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <ShieldCheck size={22} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-base-content">
                                    Host Information
                                </h2>
                                <p className="mt-1 text-sm text-base-content/55">
                                    Your account information is attached to this listing.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className={labelClass}>Host Name</label>
                                <input
                                    type="text"
                                    value={session.user.name || ""}
                                    readOnly
                                    className={`${inputClass} cursor-not-allowed bg-base-200`}
                                />
                            </div>

                            <div>
                                <label className={labelClass}>Host Email</label>
                                <input
                                    type="email"
                                    value={session.user.email || ""}
                                    readOnly
                                    className={`${inputClass} cursor-not-allowed bg-base-200`}
                                />
                            </div>
                        </div>

                        <p className="mt-4 text-xs leading-relaxed text-base-content/50">
                            Your host information is provided by your StudioSpace account
                            and cannot be changed from this form.
                        </p>
                    </div>

                    {/* Submission */}
                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                            <Sparkles size={21} className="mt-0.5 shrink-0 text-primary" />
                            <div>
                                <h3 className="font-bold text-base-content">
                                    Ready to share your space?
                                </h3>
                                <p className="mt-1 text-sm leading-relaxed text-base-content/60">
                                    Review your information before publishing. Your listing
                                    will be available for creators to discover once submitted.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <Link
                                href="/my-listings"
                                className="btn btn-ghost rounded-xl"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary rounded-xl border-none px-7"
                            >
                                {isSubmitting ? (
                                    <>
                                        <LoaderCircle size={18} className="animate-spin" />
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        Publish Studio
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default AddStudioPage;
