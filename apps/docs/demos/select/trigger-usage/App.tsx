"use client";

import {
  LabelMenuButton,
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react";

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
      <SelectTrigger asChild w="224">
        <LabelMenuButton label="Priority" />
      </SelectTrigger>
      <SelectContent />
    </Select>
  );
}
