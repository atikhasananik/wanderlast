"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { DestinationCard } from "../destinations/DestinationCard";

const API_URL = "http://localhost:8000/";
const FEATURED_COUNT = 5;
const FALLBACK_IMAGE = "/images/destinations/airplane-coast.jpg";
const FALLBACK_RATING = 4.5;
const ITEM_WIDTH_CLASS = "basis-full sm:basis-1/2 lg:basis-[calc(100%/2.4)]";

function normalizeDestinations(data) {
  const rawDestinations = Array.isArray(data)
    ? data
    : (data?.destinations ?? []);

  return rawDestinations
    .filter((destination) => destination?.name)
    .map((destination, index) => {
      const id =
        destination._id ?? destination.id ?? `featured-destination-${index}`;
      const rating = Number(destination.rating);

      return {
        id,
        name: destination.name,
        country: destination.country ?? "Unknown",
        category: destination.category ?? "Other",
        price: destination.price ?? 0,
        duration: destination.duration ?? "",
        // The destinations API does not expose ratings yet.
        rating: Number.isFinite(rating) ? rating : FALLBACK_RATING,
        image: destination.imageUrl ?? destination.image ?? FALLBACK_IMAGE,
        href: destination.href ?? `/destinations/${id}`,
      };
    });
}

function selectFeatured(destinations) {
  const featured = [];
  const categories = new Set();
  const featuredIds = new Set();

  // Prefer a varied set: the first destination from each category.
  for (const destination of destinations) {
    if (
      categories.has(destination.category) ||
      featuredIds.has(destination.id)
    ) {
      continue;
    }

    categories.add(destination.category);
    featuredIds.add(destination.id);
    featured.push(destination);

    if (featured.length === FEATURED_COUNT) return featured;
  }

  // Fill the remaining slots if there are fewer than five categories.
  for (const destination of destinations) {
    if (featuredIds.has(destination.id)) continue;

    featuredIds.add(destination.id);
    featured.push(destination);

    if (featured.length === FEATURED_COUNT) break;
  }

  return featured;
}

function useCarouselPosition(api) {
  const subscribe = useCallback(
    (onStoreChange) => {
      if (!api) return () => {};

      api.on("select", onStoreChange);
      api.on("reInit", onStoreChange);

      return () => {
        api.off("select", onStoreChange);
        api.off("reInit", onStoreChange);
      };
    },
    [api],
  );

  const getSnapshot = useCallback(() => {
    if (!api) return "1:0";

    return `${api.selectedScrollSnap() + 1}:${api.scrollSnapList().length}`;
  }, [api]);

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const [current, total] = snapshot.split(":").map(Number);

  return { current, total };
}

function CarouselFooter() {
  const { api, canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarousel();
  const { current, total } = useCarouselPosition(api);

  return (
    <div className="mt-8 flex items-center gap-6">
      <span
        className="text-lg font-semibold whitespace-nowrap text-zinc-900"
        aria-live="polite"
        aria-atomic="true"
      >
        {current}/{total || 1}
      </span>
      <div className="h-px flex-1 bg-zinc-200" />
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-zinc-200 text-zinc-600 hover:border-cyan-600 hover:text-cyan-600"
          disabled={!canScrollPrev}
          onClick={scrollPrev}
        >
          <ArrowRight className="size-4 rotate-180" aria-hidden="true" />
          <span className="sr-only">Previous destinations</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full border-zinc-200 text-zinc-600 hover:border-cyan-600 hover:text-cyan-600"
          disabled={!canScrollNext}
          onClick={scrollNext}
        >
          <ArrowRight className="size-4" aria-hidden="true" />
          <span className="sr-only">Next destinations</span>
        </Button>
      </div>
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div
      className="mt-10 overflow-hidden"
      aria-busy="true"
      aria-label="Loading featured destinations"
    >
      <div className="-ml-4 flex">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={cn("shrink-0 pl-4", ITEM_WIDTH_CLASS)}>
            <Skeleton className="aspect-[3/2] w-full rounded-none bg-zinc-100" />
            <div className="flex flex-col gap-2 pt-3">
              <div className="flex items-center gap-1.5">
                <Skeleton className="size-3.5 rounded-full bg-zinc-200/80" />
                <Skeleton className="h-3 w-20 rounded-none bg-zinc-200/80" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-6 w-3/5 rounded-none bg-zinc-200/80" />
                <Skeleton className="h-6 w-16 rounded-none bg-zinc-200/80" />
              </div>
              <div className="flex items-center gap-1.5">
                <Skeleton className="size-3.5 rounded-full bg-zinc-200/80" />
                <Skeleton className="h-3 w-28 rounded-none bg-zinc-200/80" />
              </div>
              <Skeleton className="mt-2 h-4 w-24 rounded-none bg-cyan-600/15" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedError({ onRetry }) {
  return (
    <div className="mt-10 flex flex-col items-center border border-dashed border-zinc-200 bg-zinc-50 px-6 py-16 text-center">
      <p className="font-serif text-2xl text-zinc-900">
        We couldn&apos;t load featured destinations
      </p>
      <p className="mt-2 max-w-md text-sm text-zinc-500">
        The travel collection is temporarily unavailable. Please try again.
      </p>
      <Button
        variant="outline"
        className="mt-6 border-cyan-600/40 text-xs font-semibold tracking-wide text-cyan-600 uppercase hover:bg-cyan-50 hover:text-cyan-700"
        onClick={onRetry}
      >
        Try again
      </Button>
    </div>
  );
}

function FeaturedEmpty() {
  return (
    <div className="mt-10 flex flex-col items-center border border-dashed border-zinc-200 px-6 py-16 text-center">
      <p className="font-serif text-2xl text-zinc-900">
        No featured destinations yet
      </p>
      <p className="mt-2 text-sm text-zinc-500">
        Check back soon or explore the full collection.
      </p>
      <Button
        variant="outline"
        nativeButton={false}
        render={<Link href="/destinations" />}
        className="mt-6 border-cyan-600/40 text-xs font-semibold tracking-wide text-cyan-600 uppercase hover:bg-cyan-50 hover:text-cyan-700"
      >
        All Destinations
        <ArrowRight className="size-4" data-icon="inline-end" />
      </Button>
    </div>
  );
}

export function FeaturedDestinations() {
  const [requestKey, setRequestKey] = useState(0);
  const [state, setState] = useState({
    status: "loading",
    destinations: [],
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load destinations: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        const destinations = selectFeatured(normalizeDestinations(data));

        setState({
          status: destinations.length > 0 ? "success" : "empty",
          destinations,
        });
      })
      .catch((error) => {
        if (error.name === "AbortError") return;

        setState({ status: "error", destinations: [] });
      });

    return () => controller.abort();
  }, [requestKey]);

  const retry = () => {
    setState({ status: "loading", destinations: [] });
    setRequestKey((key) => key + 1);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-4xl tracking-tight text-zinc-900 sm:text-5xl">
            Featured Destinations
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>
        <Link
          href="/destinations"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-cyan-600/40 text-xs font-semibold tracking-wide text-cyan-600 uppercase hover:bg-cyan-50 hover:text-cyan-700",
          )}
        >
          All Destinations
          <ArrowRight
            className="size-4"
            data-icon="inline-end"
            aria-hidden="true"
          />
        </Link>
      </div>

      {state.status === "loading" ? (
        <FeaturedSkeleton />
      ) : state.status === "error" ? (
        <FeaturedError onRetry={retry} />
      ) : state.status === "empty" ? (
        <FeaturedEmpty />
      ) : (
        <Carousel
          className="mt-10"
          aria-label="Featured destinations"
          opts={{
            align: "start",
            loop: false,
            containScroll: "trimSnaps",
            duration: 35,
          }}
        >
          <CarouselContent>
            {state.destinations.map((destination) => (
              <CarouselItem key={destination.id} className={ITEM_WIDTH_CLASS}>
                <DestinationCard
                  compact
                  name={destination.name}
                  country={destination.country}
                  price={destination.price}
                  duration={destination.duration}
                  rating={destination.rating}
                  image={destination.image}
                  href={destination.href}
                  className="h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselFooter />
        </Carousel>
      )}
    </section>
  );
}
