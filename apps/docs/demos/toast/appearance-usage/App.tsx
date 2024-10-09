import type { ComponentPropsWithRef } from "react";

import { Button, Toast, toaster, ToastTitle } from "@optiaxiom/react";

export function App({
  colorScheme,
}: Pick<ComponentPropsWithRef<typeof Toast>, "colorScheme">) {
  return (
    <Button
      onClick={() =>
        toaster.create(
          <Toast colorScheme={colorScheme}>
            <ToastTitle>This is an example toast message.</ToastTitle>
          </Toast>,
        )
      }
    >
      Create Toast
    </Button>
  );
}
