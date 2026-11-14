
"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  LoaderCircle,
  Save,
  MapPin,
  ImagePlus,
} from "lucide-react";
import toast from "react-hot-toast";

import { useSession, authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  overview: string;
  amenities: string[];
}

const initialForm: StudioForm = {
  title: "",
  category: "",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  location: "",
  image: "",
  overview: "",
  amenities: [],
};

const EditStudioPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const studioId = params.id;

  const { data: session, isPending } = useSession();

  const [form, setForm] = useState<StudioForm>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");

  // Load the existing studio information.
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    const fetchStudio = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const { data, error } = await authClient.token();

        if (error || !data) {
          throw new Error("Authentication required. Please sign in again.");
        }

        const response = await fetch(
          `${API_URL}/studios/mine/${studioId}`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Unable to load this studio."
          );
        }

        setForm({
          title: result.title ?? "",
          category: result.category ?? "",
          hourlyRate: String(result.hourlyRate ?? ""),
          securityDeposit: String(result.securityDeposit ?? ""),
          maxCapacity: String(result.maxCapacity ?? ""),
          location: result.location ?? "",
          image: result.image ?? "",
          overview: result.overview ?? "",
          amenities: result.amenities ?? [],
        });
      } catch (error) {
        console.error("Fetching studio failed:", error);

        const message =
          error instanceof Error
            ? error.message
            : "Unable to load this studio.";

        setLoadError(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudio();
  }, [session, isPending, router, studioId]);

  // Update form fields.
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add or remove amenities.
  const handleAmenityChange = (amenity: string) => {
    setForm((previous) => ({
      ...previous,
      amenities: previous.amenities.includes(amenity)
        ? previous.amenities.filter((item) => item !== amenity)
        : [...previous.amenities, amenity],
    }));
  };

  // Submit updated studio information.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim() || form.title.trim().length < 3) {
      toast.error("Studio title must contain at least 3 characters.");
      return;
    }

    if (!form.category || !form.location.trim() || !form.overview.trim()) {
      toast.error("Please complete all required fields.");
      return;
    }

    const hourlyRate = Number(form.hourlyRate);
    const securityDeposit = Number(form.securityDeposit);
    const maxCapacity = Number(form.maxCapacity);

    if (!Number.isFinite(hourlyRate) || hourlyRate <= 0) {
      toast.error("Enter a valid hourly rate.");
      return;
    }

    if (
      !Number.isFinite(securityDeposit) ||
      securityDeposit < 0
    ) {
      toast.error("Enter a valid security deposit.");
      return;
    }

    if (
      !Number.isInteger(maxCapacity) ||
      maxCapacity < 1
    ) {
      toast.error("Capacity must be at least 1 person.");
      return;
    }

    let imageUrl: URL;

    try {
      imageUrl = new URL(form.image);
    } catch {
      toast.error("Please enter a valid image URL.");
      return;
    }

    if (!["http:", "https:"].includes(imageUrl.protocol)) {
      toast.error("Image URL must use HTTP or HTTPS.");
      return;
    }

    const toastId = toast.loading("Updating your studio...");

    setIsSaving(true);

    try {
      const { data, error } = await authClient.token();

      if (error || !data) {
        throw new Error("Authentication required. Please sign in again.");
      }

      const response = await fetch(
        `${API_URL}/studios/${studioId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify({
            title: form.title.trim(),
            category: form.category,
            hourlyRate,
            securityDeposit,
            maxCapacity,
            location: form.location.trim(),
            image: form.image.trim(),
            overview: form.overview.trim(),
            amenities: form.amenities,
          }),
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to update your studio."
        );
      }

      toast.success("Studio updated successfully!", {
        id: toastId,
      });

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      console.error("Updating studio failed:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
        { id: toastId }
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state.
  if (isPending || isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="flex flex-col items-center gap-3">
          <LoaderCircle className="animate-spin text-primary" size={36} />
          <p className="text-sm text-base-content/60">
            Loading studio information...
          </p>
        </div>
      </main>
    );
  }

  if (!session) return null;

  if (loadError) {
    return (
      <main className="min-h-screen bg-base-100 px-4 py-20">
        <div className="mx-auto max-w-lg rounded-2xl border border-base-300 p-8 text-center">
          <h1 className="text-xl font-bold text-base-content">
            Unable to load this studio
          </h1>

          <p className="mt-2 text-sm text-base-content/60">
            {loadError}
          </p>

          <Link
            href="/my-listings"
            className="btn btn-primary mt-6 rounded-xl"
          >
            Back to My Listings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/my-listings"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-base-content/60 transition hover:text-primary"
          >
            <ArrowLeft size={17} />
            Back to My Listings
          </Link>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            Host Dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            Edit Your Studio
          </h1>

          <p className="mt-2 text-base-content/60">
            Update your studio details and keep your listing accurate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic information */}
          <section className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-base-content">
                Basic Information
              </h2>
              <p className="mt-1 text-sm text-base-content/60">
                Give your studio a clear title and category.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label mb-2 font-semibold" htmlFor="title">
                  Studio Title *
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  minLength={3}
                  maxLength={100}
                  placeholder="e.g. Modern Photography Studio"
                  className="input input-bordered w-full rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="label mb-2 font-semibold" htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="select select-bordered w-full rounded-xl"
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

              <div className="sm:col-span-2">
                <label className="label mb-2 font-semibold" htmlFor="overview">
                  Studio Overview *
                </label>
                <textarea
                  id="overview"
                  name="overview"
                  value={form.overview}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder="Describe your studio, its features, and what makes it special..."
                  className="textarea textarea-bordered w-full rounded-xl"
                />
                <p className="mt-1 text-right text-xs text-base-content/50">
                  {form.overview.length}/2000 characters
                </p>
              </div>
            </div>
          </section>

          {/* Pricing and capacity */}
          <section className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-base-content">
                Pricing & Capacity
              </h2>
              <p className="mt-1 text-sm text-base-content/60">
                Set your rental price and studio capacity.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="label mb-2 font-semibold" htmlFor="hourlyRate">
                  Hourly Rate ($) *
                </label>
                <input
                  id="hourlyRate"
                  name="hourlyRate"
                  type="number"
                  min="1"
                  step="1"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full rounded-xl"
                />
              </div>

              <div>
                <label className="label mb-2 font-semibold" htmlFor="securityDeposit">
                  Security Deposit ($) *
                </label>
                <input
                  id="securityDeposit"
                  name="securityDeposit"
                  type="number"
                  min="0"
                  step="1"
                  value={form.securityDeposit}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full rounded-xl"
                />
              </div>

              <div>
                <label className="label mb-2 font-semibold" htmlFor="maxCapacity">
                  Maximum Capacity *
                </label>
                <input
                  id="maxCapacity"
                  name="maxCapacity"
                  type="number"
                  min="1"
                  step="1"
                  value={form.maxCapacity}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full rounded-xl"
                />
              </div>
            </div>
          </section>

          {/* Location and image */}
          <section className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-base-content">
                Location & Image
              </h2>
              <p className="mt-1 text-sm text-base-content/60">
                Help creators find and recognize your space.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="label mb-2 font-semibold" htmlFor="location">
                  <MapPin size={16} />
                  Studio Location *
                </label>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Dhanmondi, Dhaka"
                  className="input input-bordered w-full rounded-xl"
                />
              </div>

              <div>
                <label className="label mb-2 font-semibold" htmlFor="image">
                  <ImagePlus size={16} />
                  Studio Image URL *
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={form.image}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/studio-image.jpg"
                  className="input input-bordered w-full rounded-xl"
                />
              </div>

              {form.image && (
                <div className="overflow-hidden rounded-xl border border-base-300">
                  <img
                    src={form.image}
                    alt="Studio preview"
                    className="h-56 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Amenities */}
          <section className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-base-content">
                Studio Amenities
              </h2>
              <p className="mt-1 text-sm text-base-content/60">
                Select all the facilities available at your studio.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {availableAmenities.map((amenity) => (
                <label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-base-300 p-3 transition hover:border-primary/50 hover:bg-base-200/50"
                >
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="text-sm text-base-content">
                    {amenity}
                  </span>
                </label>
              ))}
            </div>

            <p className="mt-4 text-xs text-base-content/50">
              {form.amenities.length} amenities selected
            </p>
          </section>

          {/* Form actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/my-listings"
              className="btn btn-ghost rounded-xl"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary rounded-xl px-8"
            >
              {isSaving ? (
                <>
                  <LoaderCircle size={17} className="animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditStudioPage;
