import { Skeleton } from "./Skeleton";

export function ProductSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-64 mb-6" />

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <Skeleton className="aspect-square w-full" />
        </div>

        <div className="flex-1 max-w-md flex flex-col gap-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-16 w-full mt-2" />

          <Skeleton className="h-3 w-12 mt-4" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-11" />
            ))}
          </div>

          <Skeleton className="h-3 w-12 mt-2" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-20 rounded-full" />
            ))}
          </div>

          <Skeleton className="h-12 w-full mt-4" />
        </div>
      </div>
    </div>
  );
}
