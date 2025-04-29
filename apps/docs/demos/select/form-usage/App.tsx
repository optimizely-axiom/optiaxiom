"use client";

import {
  Button,
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
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (event.target instanceof HTMLFormElement) {
          setValue(event.target.priority.value);
        }
      }}
    >
      <Flex alignItems="start">
        <Select defaultValue={value} name="priority" options={priorities}>
          <SelectTrigger placeholder="Set priority" w="224" />
          <SelectContent />
        </Select>

        <Button appearance="primary">Submit</Button>

        <Text fontSize="md">Submitted: {value}</Text>
      </Flex>
    </form>
  );
}
