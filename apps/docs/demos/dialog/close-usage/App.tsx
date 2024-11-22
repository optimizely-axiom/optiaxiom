import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>

      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogActions />
        </DialogHeader>
        <DialogBody>This is the modal body</DialogBody>
        <DialogFooter>
          <DialogClose appearance="primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
