"use client";

import {
  IconCheckCircleSolid,
  IconCircleSolid,
  IconCircleXmark,
  IconSpinner,
} from "@optiaxiom/icons";
import { Select, SelectContent, SelectTrigger } from "@optiaxiom/react";

export function App() {
  return (
    <Select
      options={[
        {
          addon: <IconCircleSolid />,
          label: "Todo",
          value: "Todo",
        },
        {
          addon: <IconSpinner />,
          label: "In progress",
          value: "In progress",
        },
        {
          addon: <IconCheckCircleSolid />,
          label: "Done",
          value: "Done",
        },
        {
          addon: <IconCircleXmark />,
          label: "Closed",
          value: "Closed",
        },
      ]}
    >
      <SelectTrigger placeholder="Choose status" w="224" />
      <SelectContent />
    </Select>
  );
}
