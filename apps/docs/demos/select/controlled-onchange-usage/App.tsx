"use client";

import { Flex, Text } from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

const priorities = ["", "Urgent", "High", "Medium", "Low"];

export function App() {
  const [value, setValue] = useState("");

  return (
    <Flex>
      <Select
        items={priorities}
        itemToLabel={(item) => item || "No priority"}
        onChange={(event) => setValue(event.target.value)}
        value={value}
      >
        <SelectTrigger placeholder="Set priority" w="224" />
        <SelectContent />
      </Select>
      <Text fontSize="md">Selected: {value}</Text>
    </Flex>
  );
}
