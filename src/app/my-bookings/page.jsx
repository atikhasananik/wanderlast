import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { buttonVariants } from "@/components/ui/button";
import { BookingCard } from "@/components/my-bookings/booking-card";

const description = "Manage and view your upcoming travel plans";

export const metadata = {
  title: "My Bookings",
  description,
  alternates: {
    canonical: "/my-bookings",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/my-bookings",
    siteName: "Wanderlast",
    title: "My Bookings | Wanderlast",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "My Bookings | Wanderlast",
    description,
  },
};

async function getBookings(email) {
  try {
    const res = await fetch(
      `http://localhost:8000/my-bookings/${encodeURIComponent(email)}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    const bookings = Array.isArray(data) ? data : (data?.bookings ?? []);

    return { bookings, error: "" };
  } catch (error) {
    return { bookings: [], error: error.message ?? "Something went wrong" };
  }
}

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;
  if (!email) redirect("/sign-in");

  const { bookings, error } = await getBookings(email);

  return (
    <main className="min-h-dvh bg-white pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <h1 className="font-serif text-4xl tracking-tight text-zinc-900 sm:text-5xl">
          My Bookings
        </h1>
        <p className="mt-3 text-sm text-zinc-500">{description}</p>

        {error ? (
          <div
            role="status"
            className="mt-10 border border-red-200 bg-red-50 px-6 py-12 text-center"
          >
            <p className="text-sm font-medium text-red-700">
              We couldn&apos;t load your bookings.
            </p>
            <p className="mt-1 text-xs text-red-600">{error}</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="mt-10 flex flex-col items-center border border-dashed border-zinc-200 px-6 py-20 text-center">
            <h2 className="font-serif text-2xl text-zinc-900">
              No bookings yet
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              When you book a trip, it will show up here.
            </p>
            <Link
              href="/destinations"
              className={`${buttonVariants({ variant: "outline" })} mt-6`}
            >
              Browse Destinations
            </Link>
          </div>
        ) : (
          <ul className="mt-10 space-y-6">
            {bookings.map((booking) => (
              <li key={booking._id}>
                <BookingCard booking={booking} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
