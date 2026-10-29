import { Headphones, Map, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-cyan-50 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-serif text-4xl tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-zinc-500 sm:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="flex flex-col gap-10 bg-white p-8"
              >
                <Icon className="size-9 text-cyan-600" strokeWidth={1.75} />
                <div>
                  <h3 className="font-serif text-2xl text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
