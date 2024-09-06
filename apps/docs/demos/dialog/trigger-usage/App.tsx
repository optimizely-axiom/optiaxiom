import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@optiaxiom/react";
import { IconRefresh } from "@tabler/icons-react";

export function App() {
  return (
    <Dialog>
      <DialogTrigger
        appearance="primary"
        aria-label="Re-publish changes"
        icon={<IconRefresh />}
      />

      <DialogContent>
        <DialogTitle>Modal Title</DialogTitle>
        <DialogBody>This is the modal body</DialogBody>
        <DialogFooter>
          <DialogClose appearance="primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
