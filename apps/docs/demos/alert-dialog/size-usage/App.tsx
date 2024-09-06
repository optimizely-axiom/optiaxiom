import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Button,
} from "@optiaxiom/react";
import { type ComponentPropsWithRef, useState } from "react";

export function App({
  size,
}: Pick<ComponentPropsWithRef<typeof AlertDialog>, "size">) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Alert Dialog</Button>

      <AlertDialog onOpenChange={() => setOpen(false)} open={open} size={size}>
        <AlertDialogTitle>Publish Article</AlertDialogTitle>

        <AlertDialogDescription>
          Are you sure you want to publish this article?
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)} />

          <AlertDialogAction onClick={() => setOpen(false)}>
            Yes, Publish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  );
}
