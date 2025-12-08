"use client";

import { DateInput, Group, Text } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("");

  return (
    <Group flexDirection="column" gap="16" w="224">
      <DateInput onValueChange={setValue} value={value} />
      <Text fontSize="md">Input value: {value}</Text>
    </Group>
  );
}
