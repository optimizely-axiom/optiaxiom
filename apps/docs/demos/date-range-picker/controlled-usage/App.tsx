"use client";

import {
  DateRangePicker,
  DateRangePickerContent,
  DateRangePickerTrigger,
  Group,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";

const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: "long" });

export function App() {
  const [value, setValue] = useState<null | { from: Date; to: Date }>({
    from: new Date("2025-06-06T00:00"),
    to: new Date("2025-06-15T23:59"),
  });

  return (
    <Group flexDirection="column" gap="16">
      <DateRangePicker onValueChange={setValue} value={value}>
        <DateRangePickerTrigger w="224" />
        <DateRangePickerContent />
      </DateRangePicker>
      <Text fontSize="md">
        Selected: {value && formatter.formatRange(value.from, value.to)}
      </Text>
    </Group>
  );
}
