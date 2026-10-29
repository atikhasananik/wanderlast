"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const InputBtn = ({ departureDate, destination }) => {
  const { data: session } = useSession();

  const date = new Date();

  const [value, setvalue] = useState(departureDate);
  const handleBookNowBtn = async () => {
    const res = await fetch(`http://localhost:8000/add-booking`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/Json",
      },
      body: JSON.stringify({
        data: value,
        destination,
        email: session?.user.email,
        bookingData: date,
      }),
    });

    const data = await res.json();
  };

  return (
    <div>
      <Input
        type="date"
        // aria-label="Departure date"
        onChange={(e) => setvalue(e.target.value)}
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
