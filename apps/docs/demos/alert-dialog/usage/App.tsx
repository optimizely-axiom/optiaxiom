import { AlertDialog, Button } from "@optiaxiom/react";
import { type ComponentPropsWithRef, useState } from "react";

export function App({
  appearance,
  size,
}: Pick<ComponentPropsWithRef<typeof AlertDialog>, "appearance" | "size">) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Alert Dialog</Button>

      <AlertDialog
        action="Yes, Publish"
        appearance={appearance}
        onAction={() => {
          // perform some action
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        open={open}
        size={size}
        title="Publish Article"
      >
        Are you sure you want to publish this article?
      </AlertDialog>
    </>
  );
}
