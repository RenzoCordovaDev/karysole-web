import { Skeleton } from "./Skeleton";

export function CategorySkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-40 mb-6" />
      <Skeleton className="h-9 w-56 mb-2" />
      <Skeleton className="h-4 w-72 mb-8" />

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white border border-line rounded-2xl p-5">
            <Skeleton className="h-5 w-16 mb-4" />

            <Skeleton className="h-3 w-12 mb-3" />
            <div className="flex flex-wrap gap-2 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-11" />
              ))}
            </div>

            <Skeleton className="h-3 w-14 mb-3" />
            <div className="flex flex-wrap gap-3 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-7 rounded-full" />
              ))}
            </div>

            <Skeleton className="h-3 w-14 mb-3" />
            <div className="flex gap-3">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 flex-1" />
            </div>
          </div>
        </aside>

        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-32 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-line">
                <Skeleton className="aspect-square w-full rounded-none" />
                <div className="p-4 flex flex-col gap-2">
                  <Skeleton className="h-3 w-14" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-11 w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
