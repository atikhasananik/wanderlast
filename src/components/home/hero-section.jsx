import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SEARCH_FIELDS = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col">
      <Image
        src="/images/hero.jpg"
        alt="Boat gliding across a turquoise alpine lake surrounded by mountains"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Dark overlay so white text stays readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Center: headline + CTAs */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="font-serif text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/destinations/6addfa97ea6efe75a26e166b">
            <Button
              size="lg"
              className="h-12 rounded-none px-8 bg-cyan-600 text-white hover:bg-cyan-700"
            >
              Explore Now
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Button>
          </Link>

          <Link href="/destinations">
            <Button
              size="lg"
              className="h-12 rounded-none px-8 border border-white/60 bg-white/30 text-white backdrop-blur hover:bg-white/40"
            >
              View Destination
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom: glassy search bar */}
      <div className="mx-auto mb-6 flex w-full max-w-7xl flex-col overflow-hidden   bg-white/15 backdrop-blur-md sm:h-20 sm:flex-row sm:items-stretch md:mb-8">
        {SEARCH_FIELDS.map((field) => (
          <div
            key={field.label}
            className="flex-1 border-b border-white/20 px-6 py-4 last:border-b-0 sm:border-b-0 sm:border-r"
          >
            <p className="text-sm font-semibold text-white">{field.label}</p>
            <p className="mt-1 text-sm text-white/70">{field.value}</p>
          </div>
        ))}
        <Button
          size="lg"
          className="h-20 w-full rounded-none bg-cyan-600 px-10  text-white hover:bg-cyan-700 sm:w-48"
        >
          Search
        </Button>
      </div>
    </section>
  );
}
