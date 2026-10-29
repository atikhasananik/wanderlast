"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusSquare, Trash2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cruise",
  "Cultural",
];

export default function DialogPage({ destination }) {
  const [formData, setFormData] = useState(destination);
  const [status, setStatus] = useState(null);
  const [open, setOpen] = useState(false);

  const Router = useRouter();

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

    const { _id, ...dataToUpdate } = formData;

    const res = await fetch(
      `http://localhost:8000/update-destination/${destination._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      }
    );

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
    setOpen(false);
    Router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} className="">
      <DialogTrigger render={<Button variant="outline">Edit</Button>} />
      <DialogContent className="sm:max-w-sm min-w-xl">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-5">
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
                type="submit"
                className="h-10 bg-cyan-600 px-6 text-white hover:bg-cyan-700"
              >
                <PlusSquare className="size-4" data-icon="inline-start" />
                Save the Travel Package
              </Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
