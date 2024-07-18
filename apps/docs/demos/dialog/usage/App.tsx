import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogTitle,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>

      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Modal Title</DialogTitle>

        <DialogBody>
          <Text>This is the modal body</Text>
        </DialogBody>

        <DialogFooter>
          <Button appearance="primary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
