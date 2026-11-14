
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  LoaderCircle,
  Building2,
  ArrowRight,
  XCircle,
  CalendarCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import { useSession, authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

interface Booking {
  _id: string;
  studioId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;

  studio: {
    _id: string;
    title: string;
    category: string;
    location: string;
    image: string;
    hourlyRate: number;
  };
}

const statusStyles: Record<BookingStatus, string> = {
  Pending: "bg-warning/10 text-warning",
  Confirmed: "bg-success/10 text-success",
  Completed: "bg-info/10 text-info",
  Cancelled: "bg-error/10 text-error",
};

const MyBookingsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Fetch the current user's bookings.
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const fetchBookings = async () => {
      try {
        const { data, error } = await authClient.token();

        if (error || !data) {
          throw new Error("Authentication required. Please sign in again.");
        }

        const response = await fetch(`${API_URL}/bookings/mine`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load your bookings."
          );
        }

        setBookings(result);
      } catch (error) {
        console.error("Fetching bookings failed:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load your bookings."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [session, isPending, router]);

  // Cancel a pending booking.
  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    const bookingId = selectedBooking._id;
    const toastId = toast.loading("Cancelling your booking...");

    setCancellingId(bookingId);

    try {
      const { data, error } = await authClient.token();

      if (error || !data) {
        throw new Error("Authentication required. Please sign in again.");
      }

      const response = await fetch(
        `${API_URL}/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to cancel this booking."
        );
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );

      setSelectedBooking(null);

      toast.success("Booking cancelled successfully.", {
        id: toastId,
      });
    } catch (error) {
      console.error("Cancelling booking failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
        { id: toastId }
      );
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US")}`;
  };

  // Loading state.
  if (isPending || isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-base-100">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle
            className="animate-spin text-primary"
            size={36}
          />
          <p className="text-sm text-base-content/60">
            Loading your bookings...
          </p>
        </div>
      </main>
    );
  }

  if (!session) return null;

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  return (
    <main className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Page heading */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Your Dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            My Bookings
          </h1>

          <p className="mt-2 text-base-content/60">
            {`Keep track of the creative spaces you've booked.`}
          </p>
        </div>

        {/* Booking statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarDays size={21} />
              </div>
              <div>
                <p className="text-2xl font-bold text-base-content">
                  {bookings.length}
                </p>
                <p className="text-sm text-base-content/60">
                  Total Bookings
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-warning/10 text-warning">
                <Clock size={21} />
              </div>
              <div>
                <p className="text-2xl font-bold text-base-content">
                  {pendingCount}
                </p>
                <p className="text-sm text-base-content/60">
                  Pending
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10 text-success">
                <CalendarCheck size={21} />
              </div>
              <div>
                <p className="text-2xl font-bold text-base-content">
                  {confirmedCount}
                </p>
                <p className="text-sm text-base-content/60">
                  Confirmed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking list */}
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-base-300 bg-base-200/40 px-6 py-20 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CalendarDays size={30} />
            </div>

            <h2 className="text-xl font-bold text-base-content">
              {`You haven't booked a studio yet`}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-base-content/60">
              Explore creative spaces and find the perfect studio for your
              next project.
            </p>

            <Link
              href="/studios"
              className="btn btn-primary mt-7 rounded-xl gap-2"
            >
              Explore Studios
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition-shadow hover:shadow-md"
              >
                <div className="grid md:grid-cols-[240px_1fr]">

                  {/* Studio image */}
                  <div className="relative h-52 bg-base-200 md:h-full">
                    {booking.studio?.image ? (
                      <img
                        src={booking.studio.image}
                        alt={booking.studio.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-base-content/30">
                        <Building2 size={40} />
                      </div>
                    )}

                    {booking.studio?.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-base-100/95 px-3 py-1.5 text-xs font-semibold text-base-content">
                        {booking.studio.category}
                      </span>
                    )}
                  </div>

                  {/* Booking details */}
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <h2 className="text-xl font-bold text-base-content">
                          {booking.studio?.title || "Studio unavailable"}
                        </h2>

                        <p className="mt-2 flex items-center gap-2 text-sm text-base-content/60">
                          <MapPin size={15} />
                          {booking.studio?.location || "Location unavailable"}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[booking.status] || "bg-base-200 text-base-content"}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="my-5 grid grid-cols-2 gap-4 rounded-xl bg-base-200/60 p-4 sm:grid-cols-3">
                      <div>
                        <p className="mb-1 text-xs text-base-content/50">
                          Booking Date
                        </p>
                        <p className="flex items-center gap-2 text-sm font-semibold text-base-content">
                          <CalendarDays size={15} className="text-primary" />
                          {formatDate(booking.bookingDate)}
                        </p>
                      </div>

                      <div>
                        <p className="mb-1 text-xs text-base-content/50">
                          Booking Time
                        </p>
                        <p className="flex items-center gap-2 text-sm font-semibold text-base-content">
                          <Clock size={15} className="text-primary" />
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <p className="mb-1 text-xs text-base-content/50">
                          Total Price
                        </p>
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(booking.totalPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Link
                        href={`/studios/${booking.studioId}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                      >
                        View Studio
                        <ArrowRight size={15} />
                      </Link>

                      {booking.status === "Pending" && (
                        <button
                          type="button"
                          onClick={() => setSelectedBooking(booking)}
                          disabled={cancellingId === booking._id}
                          className="btn btn-outline btn-error btn-sm rounded-lg gap-2"
                        >
                          <XCircle size={15} />
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Cancellation confirmation modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-title"
            className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-error/10 text-error">
                <XCircle size={25} />
              </div>

              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                disabled={cancellingId !== null}
                aria-label="Close confirmation"
                className="btn btn-ghost btn-circle btn-sm"
              >
                ×
              </button>
            </div>

            <h2
              id="cancel-title"
              className="text-xl font-bold text-base-content"
            >
              Cancel this booking?
            </h2>

            <p className="mt-2 text-sm leading-6 text-base-content/60">
              Are you sure you want to cancel your booking for{" "}
              <strong className="text-base-content">
                {selectedBooking.studio?.title || "this studio"}
              </strong>
              ?
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                disabled={cancellingId !== null}
                className="btn btn-ghost rounded-xl"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={handleCancelBooking}
                disabled={cancellingId !== null}
                className="btn btn-error rounded-xl text-white"
              >
                {cancellingId === selectedBooking._id ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  "Yes, Cancel Booking"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyBookingsPage;
