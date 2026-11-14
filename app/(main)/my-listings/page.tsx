
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  MapPin,
  Pencil,
  Trash2,
  Building2,
  LoaderCircle,
  AlertCircle,
  X,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";

import { useSession, authClient } from "@/lib/auth-client";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  image: string;
  amenities: string[];
  overview: string;
  rating?: number | null;
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MyListingsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  // Fetch the logged-in user's studios.
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const fetchStudios = async () => {
      try {
        const { data, error } = await authClient.token();

        if (error || !data) {
          throw new Error("Unable to authenticate your request.");
        }

        const response = await fetch(`${API_URL}/studios/mine`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
          cache: "no-store",
        });

        if (!response.ok) {
          const result = await response.json().catch(() => null);
          throw new Error(
            result?.message || "Failed to load your listings."
          );
        }

        const result = await response.json();
        setStudios(result);

      } catch (error) {
        console.error("Fetching studios failed:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load your listings."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudios();
  }, [session, isPending, router]);

  // Delete a studio after confirmation.
  const handleDelete = async () => {
    if (!selectedStudio) return;

    const studioId = selectedStudio._id;
    setDeletingId(studioId);

    try {
      const { data, error } = await authClient.token();

      if (error || !data) {
        throw new Error("Authentication required. Please sign in again.");
      }

      const response = await fetch(
        `${API_URL}/studios/${studioId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to delete studio."
        );
      }

      setStudios((previous) =>
        previous.filter((studio) => studio._id !== studioId)
      );

      setSelectedStudio(null);
      toast.success("Studio deleted successfully!");

    } catch (error) {
      console.error("Deleting studio failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Session loading state.
  if (isPending || isLoading) {
    return (
      <main className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle className="animate-spin text-primary" size={36} />
          <p className="text-base-content/60 text-sm">
            Loading your listings...
          </p>
        </div>
      </main>
    );
  }

  if (!session) return null;

  return (
    <main className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Page heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
              Host Dashboard
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              My Studio Listings
            </h1>

            <p className="mt-2 text-base-content/60">
              Manage, update, and keep track of your creative spaces.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="btn btn-primary rounded-xl gap-2"
          >
            <Plus size={18} />
            Add New Studio
          </Link>
        </div>

        {/* Listing count */}
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200/60 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 size={23} />
          </div>

          <div>
            <p className="text-2xl font-bold text-base-content">
              {studios.length}
            </p>
            <p className="text-sm text-base-content/60">
              {studios.length === 1 ? "Studio listed" : "Studios listed"}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {studios.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-base-300 bg-base-200/40 px-6 py-20 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Building2 size={30} />
            </div>

            <h2 className="text-xl font-bold text-base-content">
              {`You haven't listed any studios yet`}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-base-content/60">
              Share your creative space with photographers, filmmakers,
              musicians, and other creators.
            </p>

            <Link
              href="/add-studio"
              className="btn btn-primary mt-7 rounded-xl gap-2"
            >
              <Plus size={18} />
              List Your First Studio
            </Link>
          </div>
        ) : (
          /* Studio cards */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition-shadow hover:shadow-lg"
              >
                {/* Studio image */}
                <div className="relative h-56 overflow-hidden bg-base-200">
                  {studio.image ? (
                    <img
                      src={studio.image}
                      alt={studio.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-base-content/30">
                      <Building2 size={42} />
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-base-100/95 px-3 py-1.5 text-xs font-semibold text-base-content shadow-sm">
                    {studio.category}
                  </span>
                </div>

                {/* Studio details */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-base-content">
                      {studio.title}
                    </h2>

                    <div className="flex shrink-0 items-center gap-1 text-sm text-base-content/70">
                      <Star
                        size={15}
                        className="fill-warning text-warning"
                      />
                      {studio.rating == null ? "New" : studio.rating.toFixed(1)}
                    </div>
                  </div>

                  <p className="mt-2 flex items-center gap-2 text-sm text-base-content/60">
                    <MapPin size={15} />
                    {studio.location}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-base-300 pt-4">
                    <div>
                      <p className="text-xs text-base-content/50">
                        Hourly rate
                      </p>
                      <p className="text-lg font-bold text-primary">
                        ${studio.hourlyRate}
                        <span className="text-xs font-normal text-base-content/50">
                          {" "}/ hour
                        </span>
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-base-content/50">
                        Capacity
                      </p>
                      <p className="text-sm font-semibold text-base-content">
                        {studio.maxCapacity} people
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                      href={`/studios/edit/${studio._id}`}
                      className="btn btn-outline btn-sm rounded-lg gap-2"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => setSelectedStudio(studio)}
                      className="btn btn-outline btn-error btn-sm rounded-lg gap-2"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-error/10 text-error">
                <AlertCircle size={25} />
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudio(null)}
                disabled={deletingId !== null}
                aria-label="Close confirmation"
                className="btn btn-ghost btn-circle btn-sm"
              >
                <X size={19} />
              </button>
            </div>

            <h2
              id="delete-title"
              className="text-xl font-bold text-base-content"
            >
              Delete this studio?
            </h2>

            <p className="mt-2 text-sm leading-6 text-base-content/60">
              Are you sure you want to delete{" "}
              <strong className="text-base-content">
                {selectedStudio.title}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedStudio(null)}
                disabled={deletingId !== null}
                className="btn btn-ghost rounded-xl"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deletingId !== null}
                className="btn btn-error rounded-xl text-white"
              >
                {deletingId === selectedStudio._id ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Studio
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyListingsPage;
