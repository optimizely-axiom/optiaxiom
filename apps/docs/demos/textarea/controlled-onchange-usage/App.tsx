"use client";

import { Group, Text, Textarea } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("");

  return (
    <Group flexDirection="column" gap="16" maxW="xs" w="full">
      <Textarea
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <Text fontSize="md">Input value: {value}</Text>
    </Group>
  );
}
