"use client";

import { Group, Input, Text } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("");

  return (
    <Group flexDirection="column" gap="16">
      <Input onChange={(event) => setValue(event.target.value)} value={value} />
      <Text fontSize="md">Input value: {value}</Text>
    </Group>
  );
}
