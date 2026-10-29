import { HeroSection } from "@/components/home/hero-section";
import { FeaturedDestinations } from "@/components/home/featured-destinations";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { CtaBanner } from "@/components/home/cta-banner";

const description =
  "Plan your next escape with handpicked beach, mountain, city, adventure, cruise, and cultural travel packages from Wanderlast.";

export const metadata = {
  title: {
    absolute: "Wanderlast | Discover Your Next Adventure",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Wanderlast",
    title: "Discover Your Next Adventure | Wanderlast",
    description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1920,
        height: 1200,
        alt: "Wanderlast travel destinations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discover Your Next Adventure | Wanderlast",
    description,
    images: ["/images/hero.jpg"],
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </main>
  );
}
