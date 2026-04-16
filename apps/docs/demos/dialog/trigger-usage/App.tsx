import { IconRefresh } from "@optiaxiom/icons";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <Dialog>
      <DialogTrigger
        appearance="primary"
        aria-label="Re-publish changes"
        icon={<IconRefresh />}
      />

      <DialogContent>
        <DialogHeader>Modal Title</DialogHeader>
        <DialogBody>This is the modal body</DialogBody>
        <DialogFooter>
          <DialogClose appearance="primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
