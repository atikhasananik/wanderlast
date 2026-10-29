import { SignInForm } from "@/components/auth/sign-in-form";
import { Card, CardContent } from "@/components/ui/card";

const description =
  "Sign in to your Wanderlast account and resume planning your next adventure.";

export const metadata = {
  title: "Sign In",
  description,
  alternates: {
    canonical: "/sign-in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/sign-in",
    siteName: "Wanderlast",
    title: "Sign In | Wanderlast",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In | Wanderlast",
    description,
  },
};

export default function SignInPage() {
  return (
    <main className="flex min-h-dvh justify-center bg-[#f4f5f6] px-4 py-12 lg:py-16">
      <div className="w-full mt-20 max-w-[390px]">
        <header className="text-center">
          <h1 className="font-serif text-[2rem] leading-tight tracking-tight text-zinc-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Resume your adventure with Wanderlast
          </p>
        </header>

        <Card className="mt-6 gap-0 rounded-[3px] bg-white py-(--card-spacing) shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] ring-zinc-200/80 [--card-spacing:--spacing(6)]">
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
