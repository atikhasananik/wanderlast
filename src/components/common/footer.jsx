import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/my-profile", label: "My Profile" },
];

const SUPPORT_LINKS = [
  { href: "/help-center", label: "Help Center" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const SOCIALS = [
  {
    label: "Follow us on X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M18.9 1.2h3.7l-8.1 9.3L24 22.8h-7.5l-5.9-7.6-6.7 7.6H.2l8.7-9.9L0 1.2h7.7l5.3 7 6-6.9zm-1.3 19.4h2L6.6 3.3H4.4l13.2 17.3z" />
      </svg>
    ),
  },
  {
    label: "Follow us on LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
      </svg>
    ),
  },
  {
    label: "Follow us on Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[#161311] text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        {/* Brand */}
        <p className="font-serif text-7xl font-bold tracking-tight text-white sm:text-8xl">
          Wanderlast
        </p>
        <p className="mt-4 text-lg text-zinc-400">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        {/* Columns */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-200">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-zinc-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="mt-5 flex max-w-xs items-stretch border border-zinc-700">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <Input
                id="footer-email"
                type="email"
                placeholder="Enter email"
                className="h-11 flex-1 rounded-none border-0 bg-transparent text-white placeholder:text-zinc-500 focus-visible:ring-0"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="h-11 w-12 shrink-0 text-white hover:bg-zinc-800 hover:text-cyan-600"
              >
                <ArrowUpRight className="size-5" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-200">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-cyan-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support">
            <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-200">
              Support
            </h3>
            <ul className="mt-5 space-y-4">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-cyan-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-200">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-zinc-400">
              <li>
                <a href="tel:+17869011622" className="transition-colors hover:text-cyan-600">
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="transition-colors hover:text-cyan-600"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-800 pt-6">
          <p className="text-xs text-zinc-500">
            © 2026 Wanderlust. All rights reserved.
          </p>
          <ul className="flex items-center gap-5">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-zinc-400 transition-colors hover:text-cyan-600"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
