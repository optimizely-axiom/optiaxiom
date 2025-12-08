"use client";

import { Button, Group, toaster } from "@optiaxiom/react";

export function App() {
  return (
    <Group flexWrap="wrap" gap="16">
      {(
        ["danger", "information", "neutral", "success", "warning"] as const
      ).map((intent) => (
        <Button
          key={intent}
          onClick={() =>
            toaster.create("This is an example toast message.", { intent })
          }
        >
          {intent} toast
        </Button>
      ))}
    </Group>
  );
}
