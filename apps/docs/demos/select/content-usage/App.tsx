"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";
import {
  IconCircle,
  IconProgress,
  IconProgressCheck,
  IconProgressX,
} from "@tabler/icons-react";

export function App() {
  return (
    <Select
      options={[
        {
          addon: <IconCircle size={16} />,
          label: "Todo",
          value: "Todo",
        },
        {
          addon: <IconProgress size={16} />,
          label: "In progress",
          value: "In progress",
        },
        {
          addon: <IconProgressCheck size={16} />,
          label: "Done",
          value: "Done",
        },
        {
          addon: <IconProgressX size={16} />,
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
