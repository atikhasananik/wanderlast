"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CancelBookingButton({ id }) {
  const router = useRouter();
  const [status, setStatus] = useState({ state: "idle", message: "" });

  async function handleCancel() {
    if (status.state === "pending") return;
    if (!id) return;

    const confirmed = window.confirm(
      "Cancel this booking? This can't be undone.",
    );
    if (!confirmed) return;

    setStatus({ state: "pending", message: "" });

    try {
      const res = await fetch(
        `http://localhost:8000/delete-booking/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      setStatus({ state: "idle", message: "" });
      router.refresh();
    } catch {
      // The backend route doesn't exist yet — surface it instead of failing silently.
      setStatus({
        state: "error",
        message: "Cancel isn't available yet.",
      });
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={handleCancel}
        disabled={status.state === "pending"}
        className="h-9 gap-2 border-red-200 bg-white px-4 text-red-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
      >
        {status.state === "pending" ? (
          <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
        ) : (
          <Trash2 className="size-4" data-icon="inline-start" />
        )}
        Cancel
      </Button>
      {status.state === "error" && (
        <p role="status" className="text-xs text-red-600">
          {status.message}
        </p>
      )}
    </div>
  );
}
