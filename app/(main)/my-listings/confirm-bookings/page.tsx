
"use client";

import { useEffect, useState } from "react";
import {
    AlertCircle,
    Building2,
    CalendarDays,
    Check,
    Clock3,
    Inbox,
    LoaderCircle,
    MapPin,
    RefreshCw,
    UserRound,
    X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

type Studio = {
    _id: string;
    title: string;
    image?: string;
    location?: string;
    category?: string;
};

type Booking = {
    _id: string;
    studioId: string;
    userName?: string;
    userEmail?: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
    status: string;
    createdAt?: string;
    studio: Studio | null;
};

type BookingStatus = "Confirmed" | "Cancelled";

function getErrorMessage(error: unknown): string {
    return error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";
}

async function getAuthToken(): Promise<string> {
    const { data } = await authClient.token();

    if (!data?.token) {
        throw new Error("Your session has expired. Please sign in again.");
    }

    return data.token;
}

async function getPendingBookings(): Promise<Booking[]> {
    if (!API_URL) {
        throw new Error(
            "API URL is missing. Please configure NEXT_PUBLIC_API_URL."
        );
    }

    const token = await getAuthToken();

    const response = await fetch(`${API_URL}/bookings/owner`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        cache: "no-store",
    });

    const result: unknown = await response.json().catch(() => null);

    if (!response.ok) {
        const message =
            typeof result === "object" &&
            result !== null &&
            "message" in result &&
            typeof result.message === "string"
                ? result.message
                : "Failed to fetch pending bookings.";

        throw new Error(message);
    }

    if (!Array.isArray(result)) {
        throw new Error("The server returned an invalid bookings response.");
    }

    return result as Booking[];
}

function formatDate(dateString: string): string {
    const [year, month, day] = dateString.split("-").map(Number);

    if (!year || !month || !day) {
        return dateString;
    }

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function formatTime(time: string): string {
    const [hours, minutes] = time.split(":").map(Number);

    if (
        !Number.isInteger(hours) ||
        !Number.isInteger(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59
    ) {
        return time;
    }

    return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit",
        }
    );
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    }).format(Number.isFinite(price) ? price : 0);
}

export default function ConfirmBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Initial page load.
    useEffect(() => {
        let ignore = false;

        async function loadBookings() {
            try {
                const result = await getPendingBookings();

                if (!ignore) {
                    setBookings(result);
                    setError("");
                }
            } catch (err) {
                if (!ignore) {
                    setError(getErrorMessage(err));
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        void loadBookings();

        return () => {
            ignore = true;
        };
    }, []);

    // Manual refresh.
    async function handleRefresh() {
        try {
            setIsRefreshing(true);
            setError("");
            setSuccess("");

            const result = await getPendingBookings();
            setBookings(result);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsRefreshing(false);
        }
    }

    // Confirm or reject a booking.
    async function handleBookingAction(
        bookingId: string,
        status: BookingStatus
    ) {
        try {
            setProcessingId(bookingId);
            setError("");
            setSuccess("");

            const token = await getAuthToken();

            const response = await fetch(
                `${API_URL}/bookings/${bookingId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                    body: JSON.stringify({ status }),
                }
            );

            const result: unknown = await response.json().catch(() => null);

            if (!response.ok) {
                const message =
                    typeof result === "object" &&
                    result !== null &&
                    "message" in result &&
                    typeof result.message === "string"
                        ? result.message
                        : "Failed to update the booking.";

                throw new Error(message);
            }

            // Remove the processed booking from the pending list.
            setBookings((currentBookings) =>
                currentBookings.filter(
                    (booking) => booking._id !== bookingId
                )
            );

            setSuccess(
                status === "Confirmed"
                    ? "Booking confirmed successfully."
                    : "Booking rejected successfully."
            );
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setProcessingId(null);
        }
    }

    return (
        <main className="min-h-screen bg-base-200/50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Page heading */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#F06435]">
                            <Building2 size={17} />
                            Studio Management
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-base-content sm:text-3xl">
                            Confirm Bookings
                        </h1>

                        <p className="mt-2 text-sm text-base-content/60 sm:text-base">
                            Review booking requests for your listed studios.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        disabled={isRefreshing || isLoading || processingId !== null}
                        className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-base-300 bg-base-100 px-4 py-2.5 text-sm font-semibold text-base-content transition hover:border-[#F06435] hover:text-[#F06435] disabled:cursor-not-allowed disabled:opacity-50 sm:self-center"
                    >
                        <RefreshCw
                            size={16}
                            className={isRefreshing ? "animate-spin" : ""}
                        />
                        {isRefreshing ? "Refreshing..." : "Refresh"}
                    </button>
                </div>

                {/* Summary */}
                <div className="mb-6 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#F06435]">
                            <CalendarDays size={23} />
                        </div>

                        <div>
                            <p className="text-sm text-base-content/60">
                                Pending requests
                            </p>
                            <p className="text-2xl font-bold text-base-content">
                                {bookings.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Error message */}
                {error && (
                    <div
                        role="alert"
                        className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        <AlertCircle size={19} className="mt-0.5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Success message */}
                {success && (
                    <div
                        role="status"
                        className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
                    >
                        <Check size={19} className="mt-0.5 shrink-0" />
                        <p>{success}</p>
                    </div>
                )}

                {/* Loading state */}
                {isLoading ? (
                    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100">
                        <LoaderCircle
                            size={34}
                            className="animate-spin text-[#F06435]"
                        />
                        <p className="mt-4 text-sm font-medium text-base-content/60">
                            Loading booking requests...
                        </p>
                    </div>
                ) : bookings.length === 0 ? (
                    /* Empty state */
                    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 px-6 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-[#F06435]">
                            <Inbox size={30} />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-base-content">
                            No pending bookings
                        </h2>

                        <p className="mt-2 max-w-md text-sm leading-6 text-base-content/60">
                            You have no booking requests waiting for approval.
                            New requests will appear here when someone books one
                            of your studios.
                        </p>

                        <button
                            type="button"
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="mt-5 rounded-xl bg-[#F06435] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D94C25] disabled:opacity-50"
                        >
                            {isRefreshing ? "Checking..." : "Check again"}
                        </button>
                    </div>
                ) : (
                    /* Booking cards */
                    <div className="space-y-5">
                        {bookings.map((booking) => {
                            const isProcessing =
                                processingId === booking._id;

                            return (
                                <article
                                    key={booking._id}
                                    className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm"
                                >
                                    <div className="grid md:grid-cols-[220px_1fr]">

                                        {/* Studio image */}
                                        <div
                                            className="min-h-52 bg-base-300 bg-cover bg-center md:min-h-full"
                                            style={
                                                booking.studio?.image
                                                    ? {
                                                        backgroundImage: `url("${booking.studio.image}")`,
                                                    }
                                                    : undefined
                                            }
                                            role={
                                                booking.studio?.image
                                                    ? "img"
                                                    : undefined
                                            }
                                            aria-label={
                                                booking.studio?.image
                                                    ? booking.studio.title
                                                    : undefined
                                            }
                                        >
                                            {!booking.studio?.image && (
                                                <div className="flex h-full min-h-52 items-center justify-center text-base-content/30">
                                                    <Building2 size={42} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Booking information */}
                                        <div className="min-w-0 p-5 sm:p-6">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="min-w-0">
                                                    <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-[#C94C22]">
                                                        Pending approval
                                                    </span>

                                                    <h2 className="mt-3 break-words text-xl font-bold text-base-content">
                                                        {booking.studio?.title ||
                                                            "Studio listing unavailable"}
                                                    </h2>

                                                    {booking.studio?.category && (
                                                        <p className="mt-1 text-sm text-base-content/50">
                                                            {booking.studio.category}
                                                        </p>
                                                    )}
                                                </div>

                                                <p className="shrink-0 text-lg font-bold text-[#F06435]">
                                                    {formatPrice(
                                                        booking.totalPrice
                                                    )}
                                                </p>
                                            </div>

                                            <div className="my-5 grid gap-4 border-y border-base-300 py-5 sm:grid-cols-2">
                                                <div className="flex items-start gap-3">
                                                    <UserRound
                                                        size={18}
                                                        className="mt-0.5 shrink-0 text-[#F06435]"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-base-content/50">
                                                            Customer
                                                        </p>
                                                        <p className="break-words text-sm font-semibold text-base-content">
                                                            {booking.userName ||
                                                                "Unknown customer"}
                                                        </p>
                                                        <p className="break-all text-xs text-base-content/60">
                                                            {booking.userEmail ||
                                                                "No email provided"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <MapPin
                                                        size={18}
                                                        className="mt-0.5 shrink-0 text-[#F06435]"
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-base-content/50">
                                                            Studio location
                                                        </p>
                                                        <p className="break-words text-sm font-semibold text-base-content">
                                                            {booking.studio?.location ||
                                                                "Location unavailable"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <CalendarDays
                                                        size={18}
                                                        className="mt-0.5 shrink-0 text-[#F06435]"
                                                    />
                                                    <div>
                                                        <p className="text-xs text-base-content/50">
                                                            Booking date
                                                        </p>
                                                        <p className="text-sm font-semibold text-base-content">
                                                            {formatDate(
                                                                booking.bookingDate
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <Clock3
                                                        size={18}
                                                        className="mt-0.5 shrink-0 text-[#F06435]"
                                                    />
                                                    <div>
                                                        <p className="text-xs text-base-content/50">
                                                            Booking time
                                                        </p>
                                                        <p className="text-sm font-semibold text-base-content">
                                                            {formatTime(
                                                                booking.startTime
                                                            )}{" "}
                                                            –{" "}
                                                            {formatTime(
                                                                booking.endTime
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleBookingAction(
                                                            booking._id,
                                                            "Cancelled"
                                                        )
                                                    }
                                                    disabled={
                                                        processingId !== null
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {isProcessing ? (
                                                        <LoaderCircle
                                                            size={16}
                                                            className="animate-spin"
                                                        />
                                                    ) : (
                                                        <X size={16} />
                                                    )}
                                                    Reject
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleBookingAction(
                                                            booking._id,
                                                            "Confirmed"
                                                        )
                                                    }
                                                    disabled={
                                                        processingId !== null
                                                    }
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F06435] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D94C25] disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {isProcessing ? (
                                                        <LoaderCircle
                                                            size={16}
                                                            className="animate-spin"
                                                        />
                                                    ) : (
                                                        <Check size={16} />
                                                    )}
                                                    Confirm booking
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}