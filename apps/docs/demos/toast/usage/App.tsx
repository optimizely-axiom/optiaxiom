import { Button, Toast, toaster, ToastTitle } from "@optiaxiom/react";

export function App() {
  return (
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
  );
}
