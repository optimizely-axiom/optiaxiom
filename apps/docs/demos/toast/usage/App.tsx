import { Button, Toast, ToastTitle } from "@optiaxiom/react";

import { Shell } from "./Shell";
import { toaster } from "./toaster";

export function App() {
  return (
    <Shell>
      <Button
        onClick={() =>
          toaster.create(
            <Toast>
              <ToastTitle>This is an example toast message.</ToastTitle>
            </Toast>,
          )
        }
      >
        Create Toast
      </Button>
    </Shell>
  );
}
