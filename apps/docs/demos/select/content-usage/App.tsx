"use client";

import { Select, SelectContent, SelectTrigger } from "@optiaxiom/react";
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
          addon: <IconCircle />,
          label: "Todo",
          value: "Todo",
        },
        {
          addon: <IconProgress />,
          label: "In progress",
          value: "In progress",
        },
        {
          addon: <IconProgressCheck />,
          label: "Done",
          value: "Done",
        },
        {
          addon: <IconProgressX />,
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
