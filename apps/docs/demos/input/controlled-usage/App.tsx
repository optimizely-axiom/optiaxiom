"use client";

import { Flex, Input, Text } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("");

  return (
    <Flex>
      <Input onValueChange={setValue} value={value} />
      <Text fontSize="md">Input value: {value}</Text>
    </Flex>
  );
}
