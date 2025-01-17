"use client";

import { Flex, Text } from "@optiaxiom/react";
import { InlineInput } from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState("");

  return (
    <Flex color="fg.default">
      <Text asChild w="224">
        <InlineInput label="Task title" onValueChange={setValue} />
      </Text>

      <Text>
        Typed: <strong>{value}</strong>
      </Text>
    </Flex>
  );
}
