"use client";

import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRICE_RANGES = [
  { value: "all", label: "Any Price" },
  { value: "under-1500", label: "Under $1,500" },
  { value: "1500-2500", label: "$1,500 - $2,500" },
  { value: "over-2500", label: "Over $2,500" },
];

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
];

const triggerClassName =
  "h-11 w-full rounded-none border-0 bg-transparent px-4 text-xs font-medium tracking-[0.08em] text-zinc-600 uppercase shadow-none focus-visible:ring-0 data-[size=default]:h-11";

function matchesPriceRange(price, range) {
  if (range === "under-1500") return price < 1500;
  if (range === "1500-2500") return price >= 1500 && price <= 2500;
  if (range === "over-2500") return price > 2500;
  return true;
}

export function AllDestinationsGrid({ destinations }) {
  const [category, setCategory] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const categoryOptions = useMemo(() => {
    const categories = [
      ...new Set(
        destinations.map((destination) => destination.category).filter(Boolean),
      ),
    ].sort((a, b) => a.localeCompare(b));

    return [
      { value: "all", label: "All Categories" },
      ...categories.map((item) => ({ value: item, label: item })),
    ];
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    const filtered = destinations.filter((destination) => {
      const matchesCategory = !category || destination.category === category;

      return (
        matchesCategory && matchesPriceRange(destination.priceValue, priceRange)
      );
    });

    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [category, destinations, priceRange, sortBy]);

  const resetFilters = () => {
    setCategory(null);
    setPriceRange(null);
    setSortBy(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 border border-zinc-200 sm:grid-cols-3">
        <div className="border-b border-zinc-200 sm:border-r sm:border-b-0">
          <Select
            items={categoryOptions}
            value={category}
            onValueChange={(value) =>
              setCategory(value === "all" ? null : value)
            }
          >
            <SelectTrigger
              className={triggerClassName}
              aria-label="Filter by category"
            >
              <SelectValue placeholder="CATEGORY" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border-b border-zinc-200 sm:border-r sm:border-b-0">
          <Select
            items={PRICE_RANGES}
            value={priceRange}
            onValueChange={(value) =>
              setPriceRange(value === "all" ? null : value)
            }
          >
            <SelectTrigger
              className={triggerClassName}
              aria-label="Filter by price range"
            >
              <SelectValue placeholder="PRICE RANGE" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_RANGES.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            items={SORT_OPTIONS}
            value={sortBy}
            onValueChange={(value) =>
              setSortBy(value === "recommended" ? null : value)
            }
          >
            <SelectTrigger
              className={triggerClassName}
              aria-label="Sort destinations"
            >
              <SelectValue placeholder="SORT BY" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        Showing {filteredDestinations.length} destination
        {filteredDestinations.length === 1 ? "" : "s"}
      </p>

      {filteredDestinations.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              compact
              name={destination.name}
              country={destination.country}
              price={destination.price}
              duration={destination.duration}
              rating={destination.rating}
              image={destination.image}
              href={destination.href}
              className="h-full"
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center border border-dashed border-zinc-200 px-6 py-20 text-center">
          <p className="font-serif text-2xl text-zinc-900">
            No destinations found
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Try adjusting your filters.
          </p>
          <Button variant="outline" className="mt-6" onClick={resetFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
