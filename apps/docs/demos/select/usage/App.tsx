"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

const priorities = ["", "Urgent", "High", "Medium", "Low"];

export function App() {
  return (
    <Select items={priorities} itemToLabel={(item) => item || "No priority"}>
      <SelectTrigger placeholder="Set priority" w="224" />
      <SelectContent />
    </Select>
  );
}
