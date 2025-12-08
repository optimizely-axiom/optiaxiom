"use client";

import {
  Button,
  Group,
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
      <Group alignItems="start" flexDirection="column" gap="16">
        <Select defaultValue={value} name="priority" options={priorities}>
          <SelectTrigger placeholder="Set priority" w="224" />
          <SelectContent />
        </Select>

        <Button appearance="primary">Submit</Button>

        <Text fontSize="md">Submitted: {value}</Text>
      </Group>
    </form>
  );
}
