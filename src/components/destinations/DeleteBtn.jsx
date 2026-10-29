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

export default function DialogDeleteBtn({ id }) {

    const Router = useRouter()

    const handleDelete = async() => {
        const res = await fetch(`http://localhost:8000/delete-destination/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            console.error("Failed to delete destination");
            return;
        }
        Router.push("/destinations")
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
       