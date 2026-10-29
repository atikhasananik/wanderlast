"use client";

import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function DestinationCard({
  name = "Bali Paradise",
  country = "Nepal",
  price = 2700,
  duration = "7 Days/6 Nights",
  rating = 4.5,
  image = "/images/destinations/airplane-coast.jpg",
  href = "/destinations/bali-paradise",
  compact = false,
  className,
}) {
  const priceLabel =
    typeof price === "number"
      ? `$${price}`
      : String(price).startsWith("$")
        ? String(price)
        : `$${price}`;
  const ratingLabel = Number.isFinite(Number(rating))
    ? Number(rating).toFixed(1)
    : "4.5";

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden rounded-none bg-white py-0 text-zinc-900 shadow-none ring-0",
        className,
      )}
    >
      <AspectRatio
        ratio={3 / 2}
        className="relative overflow-hidden bg-zinc-100"
      >
        <Image
          src={image}
          alt={`${name}, ${country}`}
          fill
          sizes={
            compact
              ? "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
              : "(min-width: 768px) 640px, 100vw"
          }
          className="object-cover"
        />
        <Badge
          variant="secondary"
          className={cn(
            "absolute h-auto! rounded-none bg-white/90 font-semibold text-zinc-900 shadow-sm backdrop-blur-sm hover:bg-white/90",
            compact
              ? "top-2 right-2 gap-1 px-2 py-1 text-sm [&>svg]:size-3.5!"
              : "top-4 right-4 gap-2 px-4 py-2 text-2xl [&>svg]:size-5!",
          )}
        >
          {ratingLabel}
          <Star className="fill-zinc-900 text-zinc-900" aria-hidden="true" />
        </Badge>
      </AspectRatio>

      <CardContent
        className={cn(
          "flex flex-col px-0",
          compact ? "gap-1.5 pt-3" : "gap-3 pt-6",
        )}
      >
        <p
          className={cn(
            "flex items-center text-zinc-500",
            compact ? "gap-1.5 text-xs" : "gap-2 text-lg font-medium",
          )}
        >
          <MapPin
            className={cn("shrink-0", compact ? "size-3.5" : "size-5")}
            strokeWidth={2.5}
            aria-hidden="true"
          />
          {country}
        </p>

        <div
          className={cn(
            "flex items-baseline justify-between",
            compact ? "gap-2" : "gap-4",
          )}
        >
          <CardTitle
            title={name}
            className={cn(
              "font-serif leading-none font-normal text-zinc-900",
              compact ? "min-w-0 truncate text-xl" : "text-3xl",
            )}
          >
            {name}
          </CardTitle>
          <p
            className={cn(
              "shrink-0 font-medium tracking-tight text-zinc-900",
              compact ? "text-xl" : "text-3xl",
            )}
          >
            {priceLabel}
            <span
              className={cn(
                "ml-0.5 font-normal text-zinc-500",
                compact ? "text-[10px]" : "text-sm",
              )}
            >
              /Person
            </span>
          </p>
        </div>

        <p
          className={cn(
            "flex items-center text-zinc-500",
            compact ? "gap-1.5 text-xs" : "gap-2 text-lg",
          )}
        >
          <CalendarDays
            className={cn("shrink-0", compact ? "size-3.5" : "size-5")}
            strokeWidth={2.2}
            aria-hidden="true"
          />
          {duration}
        </p>
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href={href} />}
          className={cn(
            "h-auto w-fit rounded-none border-0 p-0 font-semibold tracking-wide text-cyan-600 hover:bg-transparent hover:text-cyan-700",
            compact ? "mt-2 gap-1.5 text-xs" : "mt-4 gap-2.5 text-lg",
          )}
        >
          <span className="border-b border-cyan-600 pb-0.5">BOOK NOW</span>
          <ArrowUpRight
            className={compact ? "size-4" : "size-6"}
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </Button>
      </CardContent>
    </Card>
  );
}
