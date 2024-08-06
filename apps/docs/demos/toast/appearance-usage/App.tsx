import type { ComponentPropsWithRef } from "react";

import {
  Button,
  Toast,
  ToastProvider,
  ToastTitle,
  createToaster,
} from "@optiaxiom/react";

const toaster = createToaster();

export function App({
  colorScheme,
}: Pick<ComponentPropsWithRef<typeof Toast>, "colorScheme">) {
  return (
    <>
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

      <ToastProvider toaster={toaster} />
    </>
  );
}
