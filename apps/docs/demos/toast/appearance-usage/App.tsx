import type { ComponentPropsWithRef } from "react";

import { Button, Toast, toaster, ToastTitle } from "@optiaxiom/react";

export function App({
  intent,
}: Pick<ComponentPropsWithRef<typeof Toast>, "intent">) {
  return (
    <Button
      onClick={() =>
        toaster.create(
          <Toast intent={intent}>
            <ToastTitle>This is an example toast message.</ToastTitle>
          </Toast>,
        )
      }
    >
      Create Toast
    </Button>
  );
}
