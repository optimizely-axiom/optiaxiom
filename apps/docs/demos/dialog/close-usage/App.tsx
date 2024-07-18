import { Button, Dialog, DialogFooter, DialogTitle } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>

      <Dialog onClose={() => setOpen(false)} open={open} withCloseButton>
        <DialogTitle>Modal Title</DialogTitle>

        <DialogFooter>
          <Button appearance="primary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
