import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Pencil,
  Star,
  X,
} from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InputBtn from "@/components/destinations/Input";
import DialogPage from "@/components/destinations/Dialog";
import DialogDeleteBtn from "@/components/destinations/DeleteBtn";


const DEFAULT_HIGHLIGHTS = [
  "Handpicked accommodation",
  "Local guided experiences",
  "Private airport transfers",
  "Daily breakfast included",
  "24/7 customer support",
];

const INCLUDED = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function formatPrice(price) {
  if (price === undefined || price === null || price === "") {
    return "Contact us";
  }

  if (typeof price === "number") {
    return `$${price.toLocaleString("en-US")}`;
  }

  return String(price).startsWith("$") ? String(price) : `$${price}`;
}

function toDateInputValue(value) {
  if (!value) return "";

  // <input type="date"> only accepts YYYY-MM-DD, so keep the ISO date as-is.
  const isoDate = String(value).match(/^\d{4}-\d{2}-\d{2}/)?.[0];
  if (isoDate) return isoDate;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

async function getDestination(id) {
  const res = await fetch(
    `http://localhost:8000/add-destination/${encodeURIComponent(id)}`
  );

  if (!res.ok) return null;

  const singleCardData = await res.json();
  return singleCardData?.destination ?? singleCardData;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination?.name) {
    return {
      title: "Destination Not Found",
      description:
        "The destination you are looking for could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const country = destination.country ?? "the world";
  const description =
    destination.description ??
    `Explore ${destination.name} in ${country} with Wanderlast.`;
  const image =
    destination.imageUrl ??
    destination.image ??
    "/images/destinations/airplane-coast.jpg";
  const path = `/destinations/${id}`;

  return {
    title: destination.name,
    description,
    keywords: [
      destination.name,
      country,
      destination.category,
      "travel package",
      "Wanderlast",
    ].filter(Boolean),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: path,
      siteName: "Wanderlast",
      title: `${destination.name} | Wanderlast`,
      description,
      images: [
        {
          url: image,
          alt: `${destination.name}, ${country}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${destination.name} | Wanderlast`,
      description,
      images: [image],
    },
  };
}

const SingleCardDetailsPage = async ({ params }) => {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination?.name) {
    notFound();
  }

  const name = destination.name;
  const country = destination.country ?? "Unknown location";
  const description =
    destination.description ??
    "No overview is available for this destination yet.";
  const overview = destination.overview ?? description;
  const highlights =
    Array.isArray(destination.highlights) && destination.highlights.length > 0
      ? destination.highlights
      : DEFAULT_HIGHLIGHTS;
  const highlightsIntro = destination.highlightsIntro ?? description;
  const ratingValue = Number(destination.rating);
  const rating = Number.isFinite(ratingValue) ? ratingValue : 4.9;
  const reviews = destination.reviews ?? 234;
  const duration = destination.duration ?? "Duration on request";
  const departureDate = toDateInputValue(destination.departureDate);
  const image =
    destination.imageUrl ??
    destination.image ??
    "/images/destinations/airplane-coast.jpg";
  const price = formatPrice(destination.price);

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border border-zinc-200 bg-white px-4 py-3">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-cyan-600"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
           <DialogPage destination={destination}/>
            <DialogDeleteBtn id = {destination._id}></DialogDeleteBtn>
          </div>
        </div>

        <AspectRatio
          ratio={5 / 2}
          className="relative mt-3 overflow-hidden bg-zinc-100"
        >
          <Image
            src={image}
            alt={`${name}, ${country}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </AspectRatio>

        <div className="mt-6 border border-zinc-200 bg-zinc-50 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              <p className="flex items-center gap-2 text-sm text-zinc-500">
                <MapPin
                  className="size-4 shrink-0"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
                {country}
              </p>

              <h1 className="mt-2 font-serif text-4xl tracking-tight text-zinc-900 sm:text-5xl">
                {name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
                <span className="flex items-center gap-1 font-medium text-zinc-900">
                  <Star
                    className="size-4 fill-emerald-600 text-emerald-600"
                    aria-hidden="true"
                  />
                  {rating.toFixed(1)}
                </span>
                <span>({reviews} reviews)</span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays
                    className="size-4"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                  {duration}
                </span>
              </div>

              <h2 className="mt-8 font-serif text-2xl text-zinc-900">
                Overview
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{overview}</p>

              <h2 className="mt-8 font-serif text-2xl text-zinc-900">
                Highlights
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {highlightsIntro}
              </p>

              <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm leading-5 text-zinc-700"
                  >
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-cyan-600 text-cyan-600">
                      <Check
                        className="size-2.5"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="h-fit border border-zinc-200 bg-white p-5">
              <p className="text-xs text-zinc-500">Starting from</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight text-cyan-600">
                {price}
              </p>
              <p className="text-xs text-zinc-500">per person</p>

              <InputBtn destination={destination} departureDate={departureDate} />

              <ul className="mt-5 space-y-3 border-t border-zinc-200 pt-4">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-5 text-zinc-600"
                  >
                    <Check
                      className="mt-0.5 size-3.5 shrink-0 text-cyan-600"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleCardDetailsPage;
