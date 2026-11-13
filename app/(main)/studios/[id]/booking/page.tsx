
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

interface Studio {
    _id: string;
    title: string;
    category: string;
    location: string;
    image: string;
    hourlyRate: number;
    securityDeposit: number;
    maxCapacity: number;
}

interface BookedSlot {
    startTime: string;
    endTime: string;
}

function getLocalDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export default function BookingPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const studioId = params.id;

    const [studio, setStudio] = useState<Studio | null>(null);
    const [date, setDate] = useState(getLocalDate());
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);

    const [loadingStudio, setLoadingStudio] = useState(true);
    const [loadingAvailability, setLoadingAvailability] = useState(false);
    const [availabilityError, setAvailabilityError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Fetch studio information.
    useEffect(() => {
        async function fetchStudio() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/studios/${studioId}`,
                    { cache: "no-store" }
                );

                if (!response.ok) {
                    throw new Error("Unable to load studio information.");
                }

                const data = await response.json();
                setStudio(data);
            } catch (error) {
                console.error(error);
                toast.error("Unable to load studio information.");
            } finally {
                setLoadingStudio(false);
            }
        }

        if (studioId) fetchStudio();
    }, [studioId]);

    // Fetch existing bookings whenever the selected date changes.
    useEffect(() => {
        if (!studioId || !date) return;

        const controller = new AbortController();

        async function fetchAvailability() {
            setLoadingAvailability(true);
            setAvailabilityError("");
            setBookedSlots([]);
            setStartTime("");
            setEndTime("");

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/studios/${studioId}/availability?date=${date}`,
                    { signal: controller.signal, cache: "no-store" }
                );

                if (!response.ok) {
                    throw new Error("Unable to check availability.");
                }

                const data = await response.json();
                setBookedSlots(data.bookings || []);
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    return;
                }

                console.error(error);
                setAvailabilityError("Could not check availability. Please try again.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoadingAvailability(false);
                }
            }
        }

        fetchAvailability();

        return () => controller.abort();
    }, [studioId, date]);

    const hasTimeConflict = bookedSlots.some(
        (slot) => startTime < slot.endTime && endTime > slot.startTime
    );

    const validTimeRange =
        startTime !== "" &&
        endTime !== "" &&
        startTime < endTime;

    const duration =
        validTimeRange
            ? (new Date(`1970-01-01T${endTime}`).getTime() -
                new Date(`1970-01-01T${startTime}`).getTime()) /
              (1000 * 60 * 60)
            : 0;

    const totalPrice = studio ? duration * studio.hourlyRate : 0;

    const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!studio) return;

        if (!validTimeRange) {
            toast.error("Please select a valid start and end time.");
            return;
        }

        if (hasTimeConflict) {
            toast.error("This time overlaps with an existing booking.");
            return;
        }

        if (loadingAvailability || availabilityError) {
            toast.error("Please check availability before booking.");
            return;
        }

        setSubmitting(true);

        try {
            const { data, error } = await authClient.token();

            if (error || !data?.token) {
                throw new Error("Please sign in to book a studio.");
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.token}`,
                    },
                    body: JSON.stringify({
                        studioId,
                        bookingDate: date,
                        startTime,
                        endTime,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to complete your booking."
                );
            }

            toast.success("Studio booked successfully!");
            router.push("/my-bookings");
            router.refresh();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong.";

            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingStudio) {
        return (
            <main className="mx-auto max-w-7xl animate-pulse px-4 py-12">
                <div className="mb-8 h-6 w-40 rounded bg-base-300" />
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="space-y-5 lg:col-span-2">
                        <div className="h-72 rounded-2xl bg-base-300" />
                        <div className="h-48 rounded-2xl bg-base-300" />
                    </div>
                    <div className="h-96 rounded-2xl bg-base-300" />
                </div>
            </main>
        );
    }

    if (!studio) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-20 text-center">
                <h1 className="text-2xl font-bold">Studio not found</h1>
                <Link href="/studios" className="btn btn-primary mt-6">
                    Explore Studios
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-base-100">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                <Link
                    href={`/studios/${studioId}`}
                    className="mb-8 inline-flex items-center gap-2 text-sm text-base-content/70 hover:text-primary"
                >
                    <ArrowLeft size={16} />
                    Back to studio
                </Link>

                <div className="mb-8">
                    <p className="text-sm font-semibold text-primary">
                        COMPLETE YOUR BOOKING
                    </p>
                    <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                        Book your studio
                    </h1>
                    <p className="mt-2 text-base-content/60">
                        Choose your preferred date and available time.
                    </p>
                </div>

                <div className="grid items-start gap-8 lg:grid-cols-3">

                    {/* Booking form */}
                    <section className="lg:col-span-2">
                        <form
                            onSubmit={handleBooking}
                            className="space-y-7 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8"
                        >
                            <div>
                                <h2 className="text-xl font-bold">
                                    Select your booking date
                                </h2>
                                <p className="mt-1 text-sm text-base-content/60">
                                    Choose the day you want to use this studio.
                                </p>

                                <label className="mt-5 flex items-center gap-3 rounded-xl border border-base-300 px-4 py-3 focus-within:border-primary">
                                    <CalendarDays className="text-primary" size={20} />
                                    <input
                                        type="date"
                                        required
                                        min={getLocalDate()}
                                        value={date}
                                        onChange={(event) => setDate(event.target.value)}
                                        className="w-full bg-transparent outline-none"
                                    />
                                </label>
                            </div>

                            <div className="divider" />

                            <div>
                                <h2 className="text-xl font-bold">
                                    Available time slots
                                </h2>
                                <p className="mt-1 text-sm text-base-content/60">
                                    Select your start and end time.
                                </p>

                                {loadingAvailability ? (
                                    <div className="mt-5 flex items-center gap-3 text-sm text-base-content/60">
                                        <span className="loading loading-spinner loading-sm text-primary" />
                                        Checking availability...
                                    </div>
                                ) : availabilityError ? (
                                    <div className="alert alert-error mt-5">
                                        {availabilityError}
                                    </div>
                                ) : (
                                    <>
                                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                            <label className="form-control">
                                                <span className="mb-2 text-sm font-medium">
                                                    Start time
                                                </span>
                                                <input
                                                    type="time"
                                                    required
                                                    value={startTime}
                                                    onChange={(event) => setStartTime(event.target.value)}
                                                    className="input input-bordered w-full"
                                                />
                                            </label>

                                            <label className="form-control">
                                                <span className="mb-2 text-sm font-medium">
                                                    End time
                                                </span>
                                                <input
                                                    type="time"
                                                    required
                                                    min={startTime || undefined}
                                                    value={endTime}
                                                    onChange={(event) => setEndTime(event.target.value)}
                                                    className="input input-bordered w-full"
                                                />
                                            </label>
                                        </div>

                                        <div className="mt-5 rounded-xl bg-base-200 p-4">
                                            <h3 className="mb-3 text-sm font-semibold">
                                                Already booked on {date}
                                            </h3>

                                            {bookedSlots.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {bookedSlots.map((slot, index) => (
                                                        <span
                                                            key={`${slot.startTime}-${slot.endTime}-${index}`}
                                                            className="rounded-lg border border-error/20 bg-error/10 px-3 py-2 text-sm text-error"
                                                        >
                                                            {slot.startTime} – {slot.endTime}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-success">
                                                    No existing bookings for this date.
                                                </p>
                                            )}
                                        </div>

                                        {hasTimeConflict && (
                                            <p className="mt-3 text-sm text-error">
                                                Your selected time overlaps with an existing booking.
                                                Please choose another time.
                                            </p>
                                        )}

                                        {!hasTimeConflict && validTimeRange && (
                                            <p className="mt-3 text-sm text-success">
                                                Your selected time is currently available.
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="divider" />

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-base-content/60">
                                        Estimated booking cost
                                    </p>
                                    <p className="text-2xl font-bold">
                                        ৳{totalPrice.toLocaleString("en-BD")}
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={
                                        submitting ||
                                        loadingAvailability ||
                                        !!availabilityError ||
                                        !validTimeRange ||
                                        hasTimeConflict
                                    }
                                    className="btn btn-primary sm:min-w-48"
                                >
                                    {submitting ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm" />
                                            Booking...
                                        </>
                                    ) : (
                                        "Confirm Booking"
                                    )}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Studio summary */}
                    <aside className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                        <div className="aspect-[16/10] overflow-hidden bg-base-200">
                            <img
                                src={studio.image}
                                alt={studio.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="space-y-5 p-5">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                                    {studio.category}
                                </span>
                                <h2 className="mt-2 text-xl font-bold">
                                    {studio.title}
                                </h2>
                                <p className="mt-2 flex items-center gap-2 text-sm text-base-content/60">
                                    <MapPin size={16} />
                                    {studio.location}
                                </p>
                            </div>

                            <div className="divider my-0" />

                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm text-base-content/70">
                                    <Users size={17} />
                                    Maximum capacity
                                </span>
                                <span className="font-semibold">
                                    {studio.maxCapacity} people
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-2 text-sm text-base-content/70">
                                    <Clock size={17} />
                                    Hourly rate
                                </span>
                                <span className="font-semibold">
                                    ৳{studio.hourlyRate.toLocaleString("en-BD")}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-base-content/70">
                                    Security deposit
                                </span>
                                <span className="font-semibold">
                                    ৳{studio.securityDeposit.toLocaleString("en-BD")}
                                </span>
                            </div>

                            <div className="rounded-xl bg-base-200 p-4 text-sm text-base-content/70">
                                Your booking request will be submitted for confirmation.
                                The security deposit is displayed separately from the
                                estimated hourly booking cost.
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
