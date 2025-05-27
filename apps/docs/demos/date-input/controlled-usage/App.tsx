"use client";

import { DateInput, Flex, Text } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("");

  return (
    <Flex w="224">
      <DateInput onValueChange={setValue} value={value} />
      <Text fontSize="md">Input value: {value}</Text>
    </Flex>
  );
}
