import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>Open Dialog</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
        </DialogHeader>

        <DialogBody>This is the modal body</DialogBody>

        <DialogFooter>
          <DialogClose appearance="primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
