"use client";

import { Button, Flex, Text } from "@optiaxiom/react";
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
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (event.target instanceof HTMLFormElement) {
          setValue(event.target.priority.value);
        }
      }}
    >
      <Flex alignItems="start">
        <Select
          defaultValue={value}
          items={priorities}
          itemToLabel={(item) => item || "No priority"}
          name="priority"
        >
          <SelectTrigger placeholder="Set priority" w="224" />
          <SelectContent />
        </Select>

        <Button appearance="primary">Submit</Button>

        <Text fontSize="md">Submitted: {value}</Text>
      </Flex>
    </form>
  );
}
