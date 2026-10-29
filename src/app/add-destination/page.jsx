import { AddDestinationPage } from "@/components/addDestinatonPage/AddDestinationPage";

const description =
  "Create a new travel package and add it to the Wanderlast destination collection.";

export const metadata = {
  title: "Add New Travel Package",
  description,
  alternates: {
    canonical: "/add-destination",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/add-destination",
    siteName: "Wanderlast",
    title: "Add New Travel Package | Wanderlast",
    description,
    images: [
      {
        url: "/images/cta-banner.jpg",
        width: 2500,
        height: 1404,
        alt: "Add a new travel package to Wanderlast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add New Travel Package | Wanderlast",
    description,
    images: ["/images/cta-banner.jpg"],
  },
};

export default function Page() {
  return <AddDestinationPage />;
}
