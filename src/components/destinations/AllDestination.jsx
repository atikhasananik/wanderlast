import { auth } from "@/lib/auth";
import { AllDestinationsGrid } from "./AllDestinationsGrid";
import { headers } from "next/headers";

function parsePrice(price) {
  if (typeof price === "number") return price;

  const value = Number(String(price ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const AllDestination = async () => {
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  console.log(jwtToken?.token);
  const res = await fetch("http://localhost:8000", {
    headers: {
      authorization: `bazar ${jwtToken?.token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to load destinations: ${res.status}`);
  }

  const allDestinationsData = await res.json();
  const rawDestinations = Array.isArray(allDestinationsData)
    ? allDestinationsData
    : (allDestinationsData?.destinations ?? []);

  const destinations = rawDestinations.map((destination, index) => {
    const slug = slugify(destination.name) || `destination-${index}`;
    const id = destination._id ?? destination.id ?? slug;

    return {
      id,
      name: destination.name ?? "Untitled destination",
      country: destination.country ?? "Unknown",
      category: destination.category ?? "Other",
      price: destination.price ?? 0,
      priceValue: parsePrice(destination.price),
      duration: destination.duration ?? "",
      rating: Number(destination.rating ?? 4.5),
      image:
        destination.imageUrl ??
        destination.image ??
        "/images/destinations/airplane-coast.jpg",
      href: destination.href ?? `/destinations/${id}`,
    };
  });

  return (
    <div className="mx-auto max-w-5xl px-4 pt-32 pb-24 md:px-8">
      <h1 className="font-serif text-4xl tracking-tight text-zinc-900 sm:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-3 text-sm text-zinc-500">
        Find your perfect travel experience from our curated collection
      </p>

      <div className="mt-10">
        <AllDestinationsGrid destinations={destinations} />
      </div>
    </div>
  );
};

export default AllDestination;
