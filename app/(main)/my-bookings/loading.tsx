const BookingStatSkeleton = () => (
  <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 animate-pulse rounded-xl bg-base-200" />
      <div className="space-y-2">
        <div className="h-7 w-10 animate-pulse rounded bg-base-300" />
        <div className="h-3 w-24 animate-pulse rounded bg-base-300" />
      </div>
    </div>
  </div>
);

const BookingCardSkeleton = () => (
  <article className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
    <div className="grid md:grid-cols-[240px_1fr]">
      {/* Studio image */}
      <div className="relative h-52 bg-base-200 md:h-full">
        <div className="absolute left-3 top-3 h-6 w-24 animate-pulse rounded-full bg-base-300" />
      </div>

      {/* Booking details */}
      <div className="p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div className="space-y-3">
            <div className="h-6 w-52 max-w-full animate-pulse rounded bg-base-300" />
            <div className="h-4 w-40 max-w-full animate-pulse rounded bg-base-300" />
          </div>
          <div className="h-6 w-20 animate-pulse rounded-full bg-base-300" />
        </div>

        <div className="my-5 grid grid-cols-2 gap-4 rounded-xl bg-base-200 p-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`space-y-2 ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="h-3 w-20 animate-pulse rounded bg-base-300" />
              <div className="h-4 w-28 max-w-full animate-pulse rounded bg-base-300" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-base-300" />
          <div className="h-9 w-32 animate-pulse rounded-lg bg-base-300" />
        </div>
      </div>
    </div>
  </article>
);

const MyBookingsLoading = () => {
  return (
    <main className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-10">
          <div className="mb-2 h-4 w-36 animate-pulse rounded bg-base-300" />
          <div className="h-9 w-56 max-w-full animate-pulse rounded bg-base-300" />
          <div className="mt-2 h-4 w-72 max-w-full animate-pulse rounded bg-base-300" />
        </div>

        {/* Booking statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <BookingStatSkeleton key={index} />
          ))}
        </div>

        {/* Booking list */}
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <BookingCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyBookingsLoading;
