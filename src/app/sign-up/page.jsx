import { SignUpForm } from "@/components/auth/sign-up-form";
import { Card, CardContent } from "@/components/ui/card";

const description =
  "Create your Wanderlast account and start planning your next adventure.";

export const metadata = {
  title: "Create Account",
  description,
  alternates: {
    canonical: "/sign-up",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/sign-up",
    siteName: "Wanderlast",
    title: "Create Account | Wanderlast",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Account | Wanderlast",
    description,
  },
};

export default function SignUpPage() {
  return (
    <main className="flex min-h-dvh justify-center bg-[#f4f5f6] px-4 py-12 lg:py-16">
      <div className="w-full mt-20 max-w-[390px]">
        <header className="text-center">
          <h1 className="font-serif text-[2rem] leading-tight tracking-tight text-zinc-900">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Start your adventure with Wanderlast
          </p>
        </header>

        <Card className="mt-6 gap-0 rounded-[3px] bg-white py-(--card-spacing) shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] ring-zinc-200/80 [--card-spacing:--spacing(6)]">
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
