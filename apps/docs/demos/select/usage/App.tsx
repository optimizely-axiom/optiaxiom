"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Select
      options={[
        { label: "No priority", value: "" },
        { label: "Urgent", value: "Urgent" },
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
      ]}
    >
      <SelectTrigger placeholder="Set priority" w="224" />
      <SelectContent />
    </Select>
  );
}
