"use client";

import {
  Flex,
  Select,
  SelectContent,
  SelectTrigger,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";

const priorities = [
  { label: "No priority", value: "" },
  { label: "Urgent", value: "Urgent" },
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

export function App() {
  const [value, setValue] = useState("");

  return (
    <Flex>
      <Select
        onChange={(event) => setValue(event.target.value)}
        options={priorities}
        value={value}
      >
        <SelectTrigger placeholder="Set priority" w="224" />
        <SelectContent />
      </Select>
      <Text fontSize="md">Selected: {value}</Text>
    </Flex>
  );
}
