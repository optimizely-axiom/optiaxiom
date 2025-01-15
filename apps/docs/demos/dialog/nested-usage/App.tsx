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
      <DialogTrigger>Open Dialog</DialogTrigger>

      <DialogContent size="sm">
        <DialogHeader>Modal Title</DialogHeader>

        <DialogBody>This is the modal body</DialogBody>

        <DialogFooter>
          <Dialog>
            <DialogTrigger mr="auto">Open nested dialog</DialogTrigger>

            <DialogContent size="sm">
              <DialogHeader>Modal Title</DialogHeader>

              <DialogBody>This is the modal body</DialogBody>

              <DialogFooter>
                <Dialog>
                  <DialogTrigger mr="auto">Open nested dialog</DialogTrigger>

                  <DialogContent size="sm">
                    <DialogHeader>Modal Title</DialogHeader>

                    <DialogBody>This is the modal body</DialogBody>

                    <DialogFooter>
                      <DialogClose appearance="primary">Close</DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <DialogClose appearance="primary">Close</DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DialogClose appearance="primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
