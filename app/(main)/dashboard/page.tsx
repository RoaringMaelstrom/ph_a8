
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Building2,
  CalendarDays,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  LoaderCircle,
  LayoutDashboard,
} from "lucide-react";

import { useSession, authClient } from "@/lib/auth-client";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  image: string;
}

interface Booking {
  _id: string;
  studioTitle: string;
  bookingDate: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  totalPrice?: number;
}

const DashboardPage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect users who are not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  // Fetch the current user's listings and bookings
  useEffect(() => {
    if (isPending || !session) return;


    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error("API URL is not configured.");
        }

        // Retrieve the JWT from Better Auth.
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          throw new Error("Unable to retrieve authentication token.");
        }

        // Attach the JWT to both backend requests.
        const headers = {
          Authorization: `Bearer ${data.token}`,
        };

        const [studioResponse, bookingResponse] = await Promise.all([
          fetch(`${apiUrl}/studios/mine`, {
            headers,
            cache: "no-store",
          }),

          fetch(`${apiUrl}/bookings/mine`, {
            headers,
            cache: "no-store",
          }),
        ]);

        if (!studioResponse.ok) {
          const error = await studioResponse.json();

          throw new Error(
            `Studios API (${studioResponse.status}): ${error.message || "Failed to fetch studios."
            }`
          );
        }

        if (!bookingResponse.ok) {
          const error = await bookingResponse.json();

          throw new Error(
            `Bookings API (${bookingResponse.status}): ${error.message || "Failed to fetch bookings."
            }`
          );
        }

        const studioData = await studioResponse.json();
        const bookingData = await bookingResponse.json();

        setStudios(studioData);
        setBookings(bookingData);

      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("We couldn't load your dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };


    fetchDashboardData();
  }, [isPending, session]);

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-base-100">
        <LoaderCircle className="animate-spin text-primary" size={32} />
      </main>
    );
  }

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const stats = [
    {
      title: "My Studios",
      value: studios.length,
      description: "Your active listings",
      icon: Building2,
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      description: "All reservations",
      icon: CalendarDays,
    },
    {
      title: "Pending",
      value: pendingBookings,
      description: "Awaiting confirmation",
      icon: Clock,
    },
    {
      title: "Confirmed",
      value: confirmedBookings,
      description: "Confirmed reservations",
      icon: CheckCircle2,
    },
  ];

  const userName = session.user.name || "Creator";

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-success/10 text-success";
      case "Completed":
        return "bg-primary/10 text-primary";
      case "Cancelled":
        return "bg-error/10 text-error";
      default:
        return "bg-warning/10 text-warning";
    }
  };

  return (
    <main className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* Welcome section */}
        <section className="mb-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                <LayoutDashboard size={17} />
                Dashboard
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
                Welcome back, {userName}!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-base-content/60 sm:text-base">
                Manage your creative spaces, keep track of reservations,
                and stay on top of your StudioSpace activity.
              </p>
            </div>

            <Link
              href="/add-studio"
              className="btn btn-primary inline-flex w-fit items-center gap-2 border-none px-5"
            >
              <Plus size={18} />
              Add New Studio
            </Link>
          </div>
        </section>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-xl border border-error/30 bg-error/5 p-4 text-sm text-error">
            {error}
          </div>
        )}

        {/* Statistics */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-base-content">
              Your Overview
            </h2>
            <p className="mt-1 text-sm text-base-content/60">
              A quick look at your StudioSpace activity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={21} />
                    </div>

                    {loading ? (
                      <div className="h-8 w-10 animate-pulse rounded-md bg-base-300" />
                    ) : (
                      <span className="text-3xl font-bold tabular-nums text-base-content">
                        {stat.value}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-semibold text-base-content">
                    {stat.title}
                  </h3>

                  <p className="mt-1 text-sm text-base-content/55">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick actions */}
        <section className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-base-content">
              Quick Actions
            </h2>
            <p className="mt-1 text-sm text-base-content/60">
              Jump directly to the tools you use most.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              href="/add-studio"
              className="group flex items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Plus size={23} />
                </div>
                <div>
                  <h3 className="font-bold text-base-content">
                    Add New Studio
                  </h3>
                  <p className="mt-1 text-xs text-base-content/55">
                    Share your creative space
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={19}
                className="text-base-content/40 transition group-hover:text-primary"
              />
            </Link>

            <Link
              href="/my-listings"
              className="group flex items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 size={23} />
                </div>
                <div>
                  <h3 className="font-bold text-base-content">
                    My Studio Listings
                  </h3>
                  <p className="mt-1 text-xs text-base-content/55">
                    Manage your spaces
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={19}
                className="text-base-content/40 transition group-hover:text-primary"
              />
            </Link>

            <Link
              href="/my-bookings"
              className="group flex items-center justify-between rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CalendarDays size={23} />
                </div>
                <div>
                  <h3 className="font-bold text-base-content">
                    My Bookings
                  </h3>
                  <p className="mt-1 text-xs text-base-content/55">
                    View your reservations
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={19}
                className="text-base-content/40 transition group-hover:text-primary"
              />
            </Link>
          </div>
        </section>

        {/* Recent bookings */}
        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-base-content">
                Recent Bookings
              </h2>
              <p className="mt-1 text-sm text-base-content/60">
                Keep track of your latest reservations.
              </p>
            </div>

            <Link
              href="/my-bookings"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
            {loading ? (
              <div className="space-y-4 p-6">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-14 animate-pulse rounded-lg bg-base-200"
                  />
                ))}
              </div>
            ) : bookings.length > 0 ? (
              <div className="divide-y divide-base-300">
                {bookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking._id}
                    className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"
                  >
                    <div>
                      <h3 className="font-semibold text-base-content">
                        {booking.studioTitle || "Studio Reservation"}
                      </h3>

                      <p className="mt-1 flex items-center gap-1.5 text-sm text-base-content/55">
                        <CalendarDays size={14} />
                        {booking.bookingDate
                          ? new Date(booking.bookingDate).toLocaleDateString()
                          : "Date unavailable"}
                      </p>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-base-content/50">
                  <CalendarDays size={22} />
                </div>

                <h3 className="mt-4 font-bold text-base-content">
                  No bookings yet
                </h3>

                <p className="mt-2 text-sm text-base-content/60">
                  Your reservations will appear here once you book a studio.
                </p>

                <Link
                  href="/studios"
                  className="btn btn-primary mt-5 border-none"
                >
                  Explore Studios
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardPage;
