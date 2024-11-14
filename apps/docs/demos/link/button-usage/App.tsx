import { Link, Text, Toast, toaster, ToastTitle } from "@optiaxiom/react";

export function App() {
  return (
    <Text>
      This is{" "}
      <Link asChild href="data:,">
        <button
          onClick={() =>
            toaster.create(
              <Toast>
                <ToastTitle>Clicked!</ToastTitle>
              </Toast>,
            )
          }
        >
          actually a button
        </button>
      </Link>
    </Text>
  );
}
