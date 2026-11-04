"use client";


import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";

export default function DialogDeleteBtn({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    const {data} = await authClient.token()
   const token =data?.token
    try {
      const res = await fetch(
        apiUrl(`delete-destination/${encodeURIComponent(id)}`),
        {
          method: "DELETE",
          headers:{
            authorization: `bearer ${token}`
          }
        },
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      toast.add({
        title: "Destination deleted",
        description: "The destination was removed successfully.",
        type: "success",
      });
      router.push("/destinations");
    } catch (error) {
      toast.add({
        title: "Destination not deleted",
        description: error.message || "Failed to delete the destination.",
        type: "error",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" variant="outline">
            
            <X className="size-4" aria-hidden="true" />
            delete
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Destination</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this destination? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-end gap-2">
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <DialogClose
            render={
              <Button
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700"
              />
            }
          >
            Delete
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
       