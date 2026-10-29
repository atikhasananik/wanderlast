"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

const AUTH_ROUTES = new Set(["/sign-up"]);

export function SiteChrome({ children }) {
  const pathname = usePathname();

  if (AUTH_ROUTES.has(pathname)) {
    return children;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </>
  );
}
