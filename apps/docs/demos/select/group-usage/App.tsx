"use client";

import { Select, SelectContent, SelectTrigger } from "@optiaxiom/react";

const groups = {
  none: {
    hidden: true,
    label: "No priority",
  },
  values: {
    label: "Priorities",
    separator: true,
  },
};

export function App() {
  return (
    <Select
      options={[
        {
          group: groups.none,
          label: "No priority",
          value: "",
        },
        {
          group: groups.values,
          label: "Urgent",
          value: "Urgent",
        },
        {
          group: groups.values,
          label: "High",
          value: "High",
        },
        {
          group: groups.values,
          label: "Medium",
          value: "Medium",
        },
        {
          group: groups.values,
          label: "Low",
          value: "Low",
        },
      ]}
    >
      <SelectTrigger placeholder="Set priority" w="224" />
      <SelectContent />
    </Select>
  );
}
