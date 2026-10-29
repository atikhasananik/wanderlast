import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock, Eye, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { CancelBookingButton } from "@/components/my-bookings/cancel-booking-button";

const STATUS_STYLES = {
  confirmed: {
    label: "Confirmed",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: Clock,
  },
};

function formatDepartureDate(value) {
  if (!value) return "Not set";

  // Booking dates arrive as "YYYY-MM-DD"; parse the parts manually so the
  // date never shifts a day across timezones (new Date(string) is UTC).
  const parts = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  const date = parts
    ? new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]))
    : new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }) {
  const key = String(status ?? "confirmed").toLowerCase();
  const style = STATUS_STYLES[key] ?? STATUS_STYLES.confirmed;
  const Icon = style.icon;

  return (
    <Badge
      variant="outline"
      className={`h-6 gap-1.5 rounded-full px-2.5 text-xs font-medium ${style.className}`}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {style.label}
    </Badge>
  );
}

export function BookingCard({ booking }) {
  const destination = booking?.destination ?? {};
  const id = booking?._id;
  const name = destination.name ?? "Untitled destination";
  const image =
    destination.imageUrl ??
    destination.image ??
    "/images/destinations/airplane-coast.jpg";
  const departure = formatDepartureDate(
    booking?.data ?? destination.departureDate,
  );

  return (
    <article className="flex flex-col gap-5 border border-zinc-200 bg-white p-4 sm:flex-row sm:gap-6 sm:p-5">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-100 sm:aspect-auto sm:w-72">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 288px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div>
          <StatusBadge status={booking?.status} />
        </div>

        <h2 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">
          {name}
        </h2>

        <dl className="mt-3 space-y-2 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <CalendarDays
              className="size-4 shrink-0"
              strokeWidth={2}
              aria-hidden="true"
            />
            <dt className="sr-only">Departure</dt>
            <dd>
              Departure: <span className="text-zinc-700">{departure}</span>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <MapPin
              className="size-4 shrink-0"
              strokeWidth={2}
              aria-hidden="true"
            />
            <dt className="sr-only">Booking ID</dt>
            <dd className="min-w-0">
              Booking ID:{" "}
              <span className="break-all text-zinc-700">{id}</span>
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-4">
          <p className="text-3xl font-semibold tracking-tight text-cyan-600">
            {destination.price ?? "—"}
          </p>

          <div className="flex items-center gap-3">
            <CancelBookingButton id={id} />
            <Link
              href={`/destinations/${destination._id}`}
              className={`${buttonVariants({ variant: "outline" })} h-9 gap-2 border-cyan-600 bg-cyan-600 px-4 text-white hover:bg-cyan-700 hover:text-white`}
            >
              <Eye className="size-4" data-icon="inline-start" />
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
