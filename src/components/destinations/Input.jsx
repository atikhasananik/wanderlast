"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { apiUrl } from "@/lib/api";
import { toast } from "@/components/ui/toast";

const InputBtn = ({ departureDate, destination }) => {
  const { data: session } = useSession();

  const date = new Date();

  const [value, setValue] = useState(departureDate);
  const handleBookNowBtn = async () => {
    try {
      const res = await fetch(apiUrl("add-booking"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: value,
          destination,
          email: session?.user.email,
          bookingData: date,
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      toast.add({
        title: "Booking created",
        description: `Your trip to ${destination.name} has been booked.`,
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: "Booking not created",
        description: error.message || "Failed to create your booking.",
        type: "error",
      });
    }
  };

  return (
    <div>
      <Input
        type="date"
        onChange={(e) => setValue(e.target.value)}
        defaultValue={value}
        className="mt-5 h-10 rounded-none border-0 bg-zinc-50 px-3 text-sm text-zinc-700 shadow-none"
      />

      <Button
        onClick={handleBookNowBtn}
        className="mt-3 h-10 w-full rounded-none bg-cyan-600 text-white hover:bg-cyan-700"
      >
        Book Now
        <ArrowRight className="size-4" data-icon="inline-end" />
      </Button>
    </div>
  );
};

export default InputBtn;
