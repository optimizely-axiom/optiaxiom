"use client";

import {
  IconCancel,
  IconCheckCircle,
  IconCircle,
  IconProgressActivity,
} from "@optiaxiom/icons";
import { Select, SelectContent, SelectTrigger } from "@optiaxiom/react";

export function App() {
  return (
    <Select
      options={[
        {
          addon: <IconCircle />,
          label: "Todo",
          value: "Todo",
        },
        {
          addon: <IconProgressActivity />,
          label: "In progress",
          value: "In progress",
        },
        {
          addon: <IconCheckCircle />,
          label: "Done",
          value: "Done",
        },
        {
          addon: <IconCancel />,
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
