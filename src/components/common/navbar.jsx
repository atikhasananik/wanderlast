"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "@/lib/auth-client";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/add-destination", label: "Add Destination" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();

  const { data: session } = useSession();

  const handleSignOutBtn = async () => {
    await signOut();
  };

  return (
    <header className="fixed inset-x-5 top-5 z-50  bg-white shadow-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Left: main nav */}
        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-cyan-600 ${
                    active ? "text-cyan-600" : "text-zinc-800"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Center: logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-cyan-600"
        >
          Wanderlast
        </Link>

        {/* Right: account actions */}
        <div className="flex  items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-800 text-sm font-semibold  hover:bg-zinc-100 hover:text-cyan-600"
          >
            <User className="size-4" data-icon="inline-start" />
            Profile
          </Button>
          {!session?.user ? (
            <>
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "hidden text-sm font-semibold text-zinc-800 hover:bg-zinc-100 hover:text-cyan-600 sm:inline-flex",
                )}
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "hidden text-sm font-semibold text-zinc-800 hover:bg-zinc-100 hover:text-cyan-600 md:inline-flex",
                )}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleSignOutBtn}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "hidden text-sm font-semibold text-zinc-800 hover:bg-zinc-100 hover:text-cyan-600 sm:inline-flex",
                )}
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile nav (row below the bar on small screens) */}
      <ul className="flex items-center justify-center gap-5 border-t border-zinc-100 py-2 lg:hidden">
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-sm font-semibold  transition-colors hover:text-cyan-600 ${
                  active ? "text-cyan-600" : "text-zinc-800"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
