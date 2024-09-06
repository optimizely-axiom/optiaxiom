import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>

      <DialogContent withCloseButton>
        <DialogTitle>Modal Title</DialogTitle>
        <DialogBody>This is the modal body</DialogBody>
        <DialogFooter>
          <DialogClose appearance="primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
