import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@optiaxiom/react";
import { type ComponentPropsWithRef } from "react";

export function App({
  modal = false,
  size,
}: Pick<ComponentPropsWithRef<typeof Dialog>, "modal"> &
  Pick<ComponentPropsWithRef<typeof DialogContent>, "size">) {
  return (
    <Dialog modal={modal}>
      <DialogTrigger>Open Dialog</DialogTrigger>

      <DialogContent aria-describedby={undefined} size={size}>
        <DialogTitle>Modal Title</DialogTitle>
        <DialogBody>This is the modal body</DialogBody>
        <DialogFooter>
          <DialogClose appearance="primary">Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
