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

export default function Loading() {
  return (
    <main
      className="min-h-screen bg-white pt-32 pb-24"
      aria-busy="true"
      aria-label="Loading destination details"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border border-zinc-200 bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <LoadingBar className="size-4 rounded-full" />
            <LoadingBar className="h-4 w-36" />
          </div>
          <div className="flex items-center gap-2">
            <LoadingBar className="h-7 w-20" />
            <LoadingBar className="h-7 w-24" />
          </div>
        </div>

        <AspectRatio
          ratio={5 / 2}
          className="relative mt-3 overflow-hidden bg-zinc-100"
        >
          <LoadingBar className="absolute inset-0 size-full bg-zinc-200/70" />
        </AspectRatio>

        <div className="mt-6 border border-zinc-200 bg-zinc-50 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <div className="flex items-center gap-2">
                <LoadingBar className="size-4 rounded-full" />
                <LoadingBar className="h-4 w-28" />
              </div>

              <LoadingBar className="mt-3 h-12 w-4/5 max-w-xl" />

              <div className="mt-4 flex flex-wrap gap-4">
                <LoadingBar className="h-4 w-16" />
                <LoadingBar className="h-4 w-28" />
                <LoadingBar className="h-4 w-32" />
              </div>

              <LoadingBar className="mt-10 h-7 w-32" />
              <div className="mt-3 space-y-2">
                <LoadingBar className="h-4 w-full" />
                <LoadingBar className="h-4 w-11/12" />
                <LoadingBar className="h-4 w-3/4" />
              </div>

              <LoadingBar className="mt-9 h-7 w-28" />
              <div className="mt-3 space-y-2">
                <LoadingBar className="h-4 w-full" />
                <LoadingBar className="h-4 w-10/12" />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <LoadingBar className="size-4 rounded-full" />
                    <LoadingBar
                      className={cn(
                        "h-4",
                        index % 2 === 0 ? "w-10/12" : "w-8/12"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <aside className="h-fit border border-zinc-200 bg-white p-5">
              <LoadingBar className="h-3 w-20" />
              <LoadingBar className="mt-2 h-9 w-32 bg-cyan-600/15" />
              <LoadingBar className="mt-2 h-3 w-16" />

              <LoadingBar className="mt-5 h-10 w-full" />
              <LoadingBar className="mt-3 h-10 w-full bg-cyan-600/25" />

              <div className="mt-5 space-y-3 border-t border-zinc-200 pt-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <LoadingBar className="size-3.5 rounded-full" />
                    <LoadingBar
                      className={cn(
                        "h-3",
                        index === 1 ? "w-8/12" : "w-10/12"
                      )}
                    />
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
