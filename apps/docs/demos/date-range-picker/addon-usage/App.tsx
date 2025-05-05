"use client";

import {
  DateRangePicker,
  DateRangePickerContent,
  DateRangePickerTrigger,
  SegmentedControl,
  SegmentedControlItem,
} from "@optiaxiom/react";
import { useState } from "react";

import { presetToRange } from "./presetToRange";

export function App() {
  const [preset, setPreset] = useState("custom");
  const [value, setValue] = useState<null | { from: Date; to: Date }>(null);

  return (
    <DateRangePicker
      onValueChange={(value) => {
        setPreset("custom");
        setValue(value);
      }}
      value={value}
    >
      <DateRangePickerTrigger w="224" />
      <DateRangePickerContent
        addonBefore={
          <SegmentedControl
            flexDirection="column"
            gap="2"
            mr="8"
            onValueChange={(preset: string) => {
              if (!preset || preset === "custom") {
                return;
              }

              setPreset(preset);
              setValue(presetToRange(preset));
            }}
            value={preset}
          >
            <SegmentedControlItem value="today">Today</SegmentedControlItem>
            <SegmentedControlItem value="week">This week</SegmentedControlItem>
            <SegmentedControlItem value="month">
              This month
            </SegmentedControlItem>
            <SegmentedControlItem value="next-week">
              Next week
            </SegmentedControlItem>
            <SegmentedControlItem value="next-month">
              Next month
            </SegmentedControlItem>
            <SegmentedControlItem value="custom">Custom</SegmentedControlItem>
          </SegmentedControl>
        }
      />
    </DateRangePicker>
  );
}
