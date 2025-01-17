"use client";

import { Button, toaster } from "@optiaxiom/react";

export function App() {
  return (
    <Button
      onClick={async () => {
        const id = toaster.create("Saving task");
        // simulate network request
        await new Promise((resolve) => setTimeout(resolve, 3_000));
        toaster.remove(id);
        toaster.create("Could not save task", { type: "danger" });
      }}
    >
      Create Toast
    </Button>
  );
}
