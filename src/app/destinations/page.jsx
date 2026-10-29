import AllDestination from "@/components/destinations/AllDestination";

const description =
  "Browse curated beach, mountain, city, adventure, cruise, and cultural travel packages from around the world.";

export const metadata = {
  title: "Explore All Destinations",
  description,
  alternates: {
    canonical: "/destinations",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/destinations",
    siteName: "Wanderlast",
    title: "Explore All Destinations | Wanderlast",
    description,
    images: [
      {
        url: "/images/cta-banner.jpg",
        width: 2500,
        height: 1404,
        alt: "Explore travel destinations with Wanderlast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore All Destinations | Wanderlast",
    description,
    images: ["/images/cta-banner.jpg"],
  },
};

export default async function Page() {

  return <AllDestination  />;
}
