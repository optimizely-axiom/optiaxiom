"use client";

import { Button, toaster } from "@optiaxiom/react";

export function App() {
  return (
    <Button onClick={() => toaster.create("This is an example toast message.")}>
      Create Toast
    </Button>
  );
}
