"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const TESTIMONIALS = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/testimonials/michael.jpg",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/testimonials/sarah.jpg",
  },
  {
    quote:
      '"Japan Cherry Blossom Tour Was A Dream Come True. Flawless Organization From Arrival To Departure — I Did Not Have To Worry About A Single Thing."',
    name: "David Okafor",
    location: "London, UK",
    image: "/images/testimonials/testimonial-3.jpg",
  },
  {
    quote:
      '"Santorini Was Paradise! Beautiful Hotels, Amazing Local Food And A Travel Concierge Who Genuinely Cared About Our Experience. Worth Every Penny."',
    name: "Amelia Rodríguez",
    location: "Madrid, Spain",
    image: "/images/testimonials/testimonial-4.jpg",
  },
];

function TestimonialCard({ testimonial }) {
  return (
    <article className="flex h-full flex-col-reverse gap-6 border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center sm:gap-7">
      <div className="flex flex-1 flex-col justify-between gap-10">
        <blockquote className="font-serif text-lg leading-relaxed text-zinc-900">
          {testimonial.quote}
        </blockquote>
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-cyan-600">
            <span aria-hidden="true" className="inline-block w-5 border-t border-cyan-600" />
            {testimonial.name}
          </p>
          <p className="mt-1 pl-7 text-xs text-zinc-500">
            {testimonial.location}
          </p>
        </div>
      </div>
      <Image
        src={testimonial.image}
        alt={`${testimonial.name}, ${testimonial.location}`}
        width={224}
        height={224}
        sizes="(min-width: 640px) 224px, 100vw"
        className="size-40 shrink-0 object-cover sm:size-56"
      />
    </article>
  );
}

function CarouselArrows() {
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarousel();

  const buttonClass =
    "h-10 w-10 rounded-full border-zinc-200 text-zinc-500 hover:border-cyan-600 hover:text-cyan-600 disabled:opacity-40";

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className={buttonClass}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ArrowRight className="size-4 rotate-180" />
        <span className="sr-only">Previous testimonials</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={buttonClass}
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ArrowRight className="size-4" />
        <span className="sr-only">Next testimonials</span>
      </Button>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
      <Carousel opts={{ align: "start", loop: false }}>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-5xl tracking-tight text-zinc-900 sm:text-6xl">
              What Travelers Say
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Real experiences from our happy travelers
            </p>
          </div>
          <CarouselArrows />
        </div>

        {/* Cards */}
        <CarouselContent className="mt-10">
          {TESTIMONIALS.map((testimonial) => (
            <CarouselItem
              key={testimonial.name}
              className="basis-full sm:basis-1/2"
            >
              <TestimonialCard testimonial={testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
