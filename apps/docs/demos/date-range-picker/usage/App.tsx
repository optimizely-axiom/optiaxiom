import {
  DateRangePicker,
  DateRangePickerContent,
  DateRangePickerTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <DateRangePicker>
      <DateRangePickerTrigger w="224" />
      <DateRangePickerContent />
    </DateRangePicker>
  );
}
