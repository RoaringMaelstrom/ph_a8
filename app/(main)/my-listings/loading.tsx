const ListingCardSkeleton = () => (
  <article className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
    {/* Studio image */}
    <div className="relative h-56 overflow-hidden bg-base-200">
      <div className="absolute left-4 top-4 h-6 w-24 animate-pulse rounded-full bg-base-300" />
    </div>

    {/* Studio details */}
    <div className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="h-6 w-40 max-w-full animate-pulse rounded bg-base-300" />
        <div className="h-4 w-12 shrink-0 animate-pulse rounded bg-base-300" />
      </div>

      <div className="mt-2 h-4 w-32 max-w-full animate-pulse rounded bg-base-300" />

      <div className="mt-5 flex items-center justify-between border-t border-base-300 pt-4">
        <div className="space-y-2">
          <div className="h-3 w-16 animate-pulse rounded bg-base-300" />
          <div className="h-6 w-24 animate-pulse rounded bg-base-300" />
        </div>

        <div className="space-y-2">
          <div className="ml-auto h-3 w-16 animate-pulse rounded bg-base-300" />
          <div className="ml-auto h-4 w-20 animate-pulse rounded bg-base-300" />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="h-8 animate-pulse rounded-lg bg-base-200" />
        <div className="h-8 animate-pulse rounded-lg bg-base-200" />
      </div>
    </div>
  </article>
);

const MyListingsLoading = () => {
  return (
    <main className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 h-4 w-32 animate-pulse rounded bg-base-300" />
            <div className="h-9 w-64 max-w-full animate-pulse rounded bg-base-300" />
            <div className="mt-2 h-4 w-80 max-w-full animate-pulse rounded bg-base-300" />
          </div>

          <div className="h-12 w-40 animate-pulse rounded-xl bg-base-300" />
        </div>

        {/* Listing count */}
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-base-300 bg-base-200/60 p-5">
          <div className="h-12 w-12 animate-pulse rounded-xl bg-base-300" />
          <div className="space-y-2">
            <div className="h-7 w-10 animate-pulse rounded bg-base-300" />
            <div className="h-3 w-24 animate-pulse rounded bg-base-300" />
          </div>
        </div>

        {/* Studio cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ListingCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyListingsLoading;
