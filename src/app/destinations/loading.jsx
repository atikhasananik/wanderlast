import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function LoadingBar({ className }) {
  return (
    <Skeleton
      className={cn("rounded-none bg-zinc-200/80", className)}
      aria-hidden="true"
    />
  );
}

function LoadingCard() {
  return (
    <div>
      <AspectRatio
        ratio={3 / 2}
        className="relative overflow-hidden bg-zinc-100"
      >
        <LoadingBar className="absolute inset-0 size-full bg-zinc-200/70" />
      </AspectRatio>

      <div className="flex flex-col gap-2 pt-3">
        <div className="flex items-center gap-1.5">
          <LoadingBar className="size-3.5 rounded-full" />
          <LoadingBar className="h-3 w-20" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <LoadingBar className="h-6 w-3/5" />
          <LoadingBar className="h-6 w-16" />
        </div>

        <div className="flex items-center gap-1.5">
          <LoadingBar className="size-3.5 rounded-full" />
          <LoadingBar className="h-3 w-28" />
        </div>

        <LoadingBar className="mt-2 h-4 w-24 bg-cyan-600/15" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div
      className="mx-auto max-w-5xl px-4 pt-32 pb-24 md:px-8"
      aria-busy="true"
      aria-label="Loading destinations"
    >
      <LoadingBar className="h-12 w-80 max-w-full" />
      <LoadingBar className="mt-3 h-4 w-96 max-w-full" />

      <div className="mt-10 grid grid-cols-1 border border-zinc-200 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex h-11 items-center px-4",
              index < 2 && "border-b border-zinc-200 sm:border-r sm:border-b-0"
            )}
          >
            <LoadingBar className="h-3 w-24" />
          </div>
        ))}
      </div>

      <LoadingBar className="mt-4 h-4 w-40" />

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </div>
  );
}
