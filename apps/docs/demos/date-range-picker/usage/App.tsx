"use client";

import {
  DateRangePicker,
  DateRangePickerContent,
  DateRangePickerTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <DateRangePicker>
      <DateRangePickerTrigger w="384" />
      <DateRangePickerContent />
    </DateRangePicker>
  );
}
