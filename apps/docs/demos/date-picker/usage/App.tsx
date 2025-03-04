"use client";

import {
  DatePicker,
  DatePickerContent,
  DatePickerTrigger,
} from "@optiaxiom/react/unstable";

export function App() {
  return (
    <DatePicker>
      <DatePickerTrigger w="224" />
      <DatePickerContent />
    </DatePicker>
  );
}
