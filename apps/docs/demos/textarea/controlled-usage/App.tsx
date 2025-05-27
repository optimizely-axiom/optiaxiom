"use client";

import { Flex, Text, Textarea } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("");

  return (
    <Flex>
      <Textarea onValueChange={setValue} value={value} />
      <Text fontSize="md">Input value: {value}</Text>
    </Flex>
  );
}
