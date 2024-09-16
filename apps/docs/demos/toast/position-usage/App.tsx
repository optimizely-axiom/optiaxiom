import type { ComponentPropsWithRef } from "react";

import {
  Button,
  Toast,
  ToastProvider,
  ToastTitle,
  toaster,
} from "@optiaxiom/react";

const messages = [
  "Short message",
  "This is a long message",
  "This is an example of a very long message",
];

export function App({
  position = "top",
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

      <ToastProvider position={position} />
    </>
  );
}
