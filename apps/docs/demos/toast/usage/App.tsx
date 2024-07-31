import {
  Button,
  Toast,
  ToastProvider,
  ToastTitle,
  createToaster,
} from "@optiaxiom/react";

const toaster = createToaster();

export function App() {
  return (
    <>
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

      <ToastProvider toaster={toaster} />
    </>
  );
}
