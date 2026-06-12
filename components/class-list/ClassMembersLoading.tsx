function Skeleton({ className }: { className: string }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

export default function ClassMembersLoading() {
  return (
    <div className="pb-28">
      <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="min-w-0">
          <Skeleton className="mb-3 h-14 w-[min(520px,100%)] rounded" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-48 rounded" />
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-24 rounded-full" />
          <Skeleton className="h-10 w-36 rounded-full" />
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
      </header>

      <section className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
            Total Members
          </p>
          <Skeleton className="mb-2 h-10 w-20 rounded" />
          <Skeleton className="h-3 w-12 rounded" />
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
            Active Now
          </p>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-16 rounded" />
            <Skeleton className="h-3 w-3 rounded-full" />
          </div>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
            Avg Progress
          </p>
          <div className="flex items-end gap-3">
            <Skeleton className="h-10 w-20 rounded" />
            <div className="flex h-8 items-end gap-1 pb-1">
              <Skeleton className="h-2 w-1 rounded-full" />
              <Skeleton className="h-4 w-1 rounded-full" />
              <Skeleton className="h-3 w-1 rounded-full" />
              <Skeleton className="h-5 w-1 rounded-full" />
              <Skeleton className="h-6 w-1 rounded-full" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
            Completion Rate
          </p>
          <Skeleton className="h-10 w-20 rounded" />
        </div>

        <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
            At-Risk
          </p>
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-16 rounded" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>
      </section>

      <div className="mb-24 overflow-hidden rounded-3xl bg-surface-container-lowest">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div className="flex min-w-75 flex-1 items-center gap-4">
            <Skeleton className="h-12 w-full max-w-md rounded-full" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-6 w-16 rounded" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-low/50 text-[11px] font-bold uppercase tracking-widest text-on-surface-variant">
                <th className="w-12 px-6 py-4">
                  <Skeleton className="h-5 w-5 rounded" />
                </th>
                <th className="px-6 py-4">Name &amp; Tag</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-container-low">
              {Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="transition-colors">
                  <td className="px-6 py-5">
                    <Skeleton className="h-5 w-5 rounded" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32 rounded" />
                        <Skeleton className="h-3 w-20 rounded-full" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <Skeleton className="h-4 w-40 rounded" />
                  </td>
                  <td className="px-6 py-5">
                    <Skeleton className="h-4 w-16 rounded" />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <Skeleton className="h-5 w-10 rounded-full" />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-1.5 flex-1 rounded-full" />
                      <Skeleton className="h-3 w-8 rounded" />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <Skeleton className="h-3 w-16 rounded" />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Skeleton className="h-6 w-6 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-surface-container-low px-6 py-4">
          <Skeleton className="h-3 w-48 rounded" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
