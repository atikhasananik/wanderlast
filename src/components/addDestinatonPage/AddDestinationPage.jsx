"use client";

import { useState } from "react";
import { PlusSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cruise",
  "Cultural",
];

const INITIAL_DATA = {
  name: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

export function AddDestinationPage() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [status, setStatus] = useState(null);

  const setField = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.country || !formData.price) {
      setStatus({
        type: "error",
        message: "Please fill in Name, Country and Price.",
      });
      return;
    }
    console.log(formData);
    // TODO: POST to /api/destinations once a backend exists.

    const res = await fetch("http://localhost:8000/add-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // const data = await res.json();
    // console.log(data);

    if (!res.ok) {
      setStatus({
        type: "error",
        message: "Failed to save the travel package.",
      });
      return;
    }

    setStatus({
      type: "success",
      message: `"${formData.name}" has been saved.`,
    });
    setFormData(INITIAL_DATA);
  };

  const handleReset = () => {
    setFormData(INITIAL_DATA);
    setStatus(null);
  };

  const inputClass =
    "h-11 rounded-lg border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400";

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <h1 className="font-serif text-4xl tracking-tight text-zinc-900 sm:text-5xl">
          Add New Travel Package
        </h1>

        <div className="mx-auto mt-12 max-w-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="space-y-5"
          >
            {/* Destination Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-900">
                Destination Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={setField("name")}
                placeholder="Bali Paradise"
                className={inputClass}
              />
            </div>

            {/* Country + Category */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-zinc-900">
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={setField("country")}
                  placeholder="Indonesia"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-zinc-900">
                  Category
                </Label>
                <NativeSelect
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={setField("category")}
                  className="w-full"
                >
                  {CATEGORIES.map((category) => (
                    <NativeSelectOption key={category} value={category}>
                      {category}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </div>

            {/* Price + Duration */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-zinc-900">
                  Price (USD)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={setField("price")}
                  placeholder="e.g., 1299"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration" className="text-zinc-900">
                  Duration
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={setField("duration")}
                  placeholder="e.g., 7 Days/6 Nights"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <Label htmlFor="departureDate" className="text-zinc-900">
                Departure Date
              </Label>
              <Input
                id="departureDate"
                name="departureDate"
                type="date"
                value={formData.departureDate}
                onChange={setField("departureDate")}
                className={inputClass}
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-zinc-900">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={setField("imageUrl")}
                placeholder="https://example.com/image.jpg"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-zinc-900">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={setField("description")}
                placeholder="Describe the travel experience..."
                className="min-h-32 rounded-lg border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-400"
              />
            </div>

            {/* Status */}
            {status && (
              <p
                className={`pt-1 text-sm ${status.type === "error" ? "text-red-600" : "text-cyan-600"}`}
                role="status"
              >
                {status.message}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4">
              <Button
                type="reset"
                variant="outline"
                className="h-10 border-red-500 px-6 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="size-4" data-icon="inline-start" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 bg-cyan-600 px-6 text-white hover:bg-cyan-700"
              >
                <PlusSquare className="size-4" data-icon="inline-start" />
                Add Travel Package
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
