"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/api";
import { toast } from "@/components/ui/toast";

export function CancelBookingButton({ id }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleCancel() {
    if (pending) return;
    if (!id) return;

    const confirmed = window.confirm(
      "Cancel this booking? This can't be undone.",
    );
    if (!confirmed) return;

    setPending(true);

    try {
      const res = await fetch(
        apiUrl(`my-booking-delete/${encodeURIComponent(id)}`),
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      toast.add({
        title: "Booking cancelled",
        description: "Your booking was cancelled successfully.",
        type: "success",
      });
      router.refresh();
    } catch (error) {
      toast.add({
        title: "Booking not cancelled",
        description: error.message || "Failed to cancel your booking.",
        type: "error",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleCancel}
      disabled={pending}
      className="h-9 gap-2 border-red-200 bg-white px-4 text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
    >
      {pending ? (
        <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
      ) : (
        <Trash2 className="size-4" data-icon="inline-start" />
      )}
      Cancel
    </Button>
  );
}
