const SectionHeadingSkeleton = ({
  titleWidth = "w-40",
  descriptionWidth = "w-64",
}: {
  titleWidth?: string;
  descriptionWidth?: string;
}) => (
  <div className="mb-5 space-y-2">
    <div className={`h-6 ${titleWidth} animate-pulse rounded bg-base-300`} />
    <div
      className={`h-4 ${descriptionWidth} max-w-full animate-pulse rounded bg-base-300`}
    />
  </div>
);

const StatCardSkeleton = () => (
  <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="h-11 w-11 animate-pulse rounded-xl bg-base-200" />
      <div className="h-8 w-10 animate-pulse rounded-md bg-base-300" />
    </div>
    <div className="mt-5 h-5 w-28 animate-pulse rounded bg-base-300" />
    <div className="mt-2 h-4 w-36 max-w-full animate-pulse rounded bg-base-300" />
  </div>
);

const QuickActionSkeleton = () => (
  <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 animate-pulse rounded-xl bg-base-200" />
        <div className="space-y-2">
          <div className="h-5 w-32 animate-pulse rounded bg-base-300" />
          <div className="h-3 w-40 max-w-full animate-pulse rounded bg-base-300" />
        </div>
      </div>
      <div className="h-5 w-5 animate-pulse rounded bg-base-300" />
    </div>
  </div>
);

const BookingRowSkeleton = () => (
  <div className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center">
    <div className="space-y-2">
      <div className="h-5 w-52 max-w-full animate-pulse rounded bg-base-300" />
      <div className="h-4 w-32 animate-pulse rounded bg-base-300" />
    </div>
    <div className="h-6 w-20 animate-pulse rounded-full bg-base-300" />
  </div>
);

const DashboardLoading = () => {
  return (
    <main className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Welcome section */}
        <section className="mb-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-4 w-4 animate-pulse rounded bg-base-300" />
                <div className="h-4 w-24 animate-pulse rounded bg-base-300" />
              </div>

              <div className="h-9 w-64 max-w-full animate-pulse rounded bg-base-300" />

              <div className="mt-3 max-w-xl space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-base-300" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-base-300" />
              </div>
            </div>

            <div className="h-12 w-40 animate-pulse rounded-lg bg-base-300" />
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-10">
          <SectionHeadingSkeleton titleWidth="w-40" descriptionWidth="w-64" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <StatCardSkeleton key={index} />
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section className="mb-10">
          <SectionHeadingSkeleton titleWidth="w-36" descriptionWidth="w-72" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <QuickActionSkeleton key={index} />
            ))}
          </div>
        </section>

        {/* Recent bookings */}
        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="h-6 w-44 animate-pulse rounded bg-base-300" />
              <div className="h-4 w-64 max-w-full animate-pulse rounded bg-base-300" />
            </div>
            <div className="h-4 w-16 animate-pulse rounded bg-base-300" />
          </div>

          <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
            <div className="divide-y divide-base-300">
              {Array.from({ length: 5 }).map((_, index) => (
                <BookingRowSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLoading;
