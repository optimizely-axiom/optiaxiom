import type { ComponentPropsWithRef } from "react";

import {
  Button,
  Toast,
  ToastProvider,
  ToastTitle,
  createToaster,
} from "@optiaxiom/react";

const toaster = createToaster();

const messages = [
  "Short message",
  "This is a long message",
  "This is an example of a very long message",
];

export function App({
  position,
}: Pick<ComponentPropsWithRef<typeof ToastProvider>, "position">) {
  return (
    <>
      <Button
        onClick={() =>
          toaster.create(
            <Toast>
              <ToastTitle>{messages[Date.now() % messages.length]}</ToastTitle>
            </Toast>,
          )
        }
      >
        Create Toast
      </Button>

      <ToastProvider position={position} toaster={toaster} />
    </>
  );
}
