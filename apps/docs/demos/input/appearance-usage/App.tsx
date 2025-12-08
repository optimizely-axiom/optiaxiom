"use client";

import { Group, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Group gap="16">
      <Input defaultValue="Text value" />
      <Input appearance="number" defaultValue="23.50" />
    </Group>
  );
}
