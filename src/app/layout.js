import { Geist, Geist_Mono, Prata } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/common/site-chrome";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heroSerif = Prata({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const siteDescription =
  "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wanderlast | Discover Your Next Adventure",
    template: "%s | Wanderlast",
  },
  description: siteDescription,
  applicationName: "Wanderlast",
  keywords: [
    "Wanderlast",
    "travel agency",
    "travel packages",
    "vacation destinations",
    "curated travel experiences",
  ],
  authors: [{ name: "Wanderlast" }],
  creator: "Wanderlast",
  publisher: "Wanderlast",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Wanderlast",
    title: "Wanderlast | Discover Your Next Adventure",
    description: siteDescription,
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
    title: "Wanderlast | Discover Your Next Adventure",
    description: siteDescription,
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${heroSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        {children}
        <Footer />
      </body>
    </html>
  );
}
