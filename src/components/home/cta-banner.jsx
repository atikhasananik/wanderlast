import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/cta-banner.jpg"
        alt="Aerial view of a tropical island surrounded by turquoise reef water"
        fill
        quality={80}
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay for text readability, like the reference */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto flex min-h-80 w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:min-h-[24rem] md:py-32">
        <h2 className="font-serif text-4xl text-white sm:text-5xl lg:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="text-sm text-white/80 sm:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button
          className="mt-4 h-12 w-72 max-w-full bg-white px-8 text-zinc-900 hover:bg-zinc-300"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" data-icon="inline-end" />
        </Button>
      </div>
    </section>
  );
}
