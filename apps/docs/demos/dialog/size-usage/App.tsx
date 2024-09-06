import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogTitle,
  Text,
} from "@optiaxiom/react";
import { type ComponentPropsWithRef, useState } from "react";

export function App({
  size,
}: Pick<ComponentPropsWithRef<typeof Dialog>, "size">) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>

      <Dialog onOpenChange={() => setOpen(false)} open={open} size={size}>
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
