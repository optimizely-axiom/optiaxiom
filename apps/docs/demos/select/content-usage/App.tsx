"use client";

import {
  Select,
  SelectContent,
  SelectRadioItem,
  SelectTrigger,
} from "@optiaxiom/react/unstable";
import {
  IconCircle,
  IconProgress,
  IconProgressCheck,
  IconProgressX,
} from "@tabler/icons-react";

const statuses = ["Todo", "In progress", "Done", "Closed"] as const;

const mapItemToIcon = {
  Closed: <IconProgressX />,
  Done: <IconProgressCheck />,
  "In progress": <IconProgress />,
  Todo: <IconCircle />,
} as const;

export function App() {
  return (
    <Select items={statuses}>
      <SelectTrigger placeholder="Choose status" w="224" />
      <SelectContent>
        {(item: (typeof statuses)[number]) => (
          <SelectRadioItem icon={mapItemToIcon[item]} item={item}>
            {item}
          </SelectRadioItem>
        )}
      </SelectContent>
    </Select>
  );
}
