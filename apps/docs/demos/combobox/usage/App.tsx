"use client";

import {
  Combobox,
  ComboboxContent,
  type ComboboxOption,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

const priorities = ["No priority", "Urgent", "High", "Medium", "Low"];

export function App() {
  const [value, setValue] = useState<string>("No priority");

  return (
    <Combobox
      items={useMemo(
        () =>
          priorities.map<ComboboxOption>((priority) => ({
            execute: () => setValue(priority),
            label: priority,
            selected: priority === value,
          })),
        [value],
      )}
    >
      <ComboboxTrigger w="224">
        {value !== "No priority" ? value : "Set priority"}
      </ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
