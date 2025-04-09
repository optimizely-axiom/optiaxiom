"use client";

import {
  Combobox,
  ComboboxContent,
  type ComboboxOption,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [value, setValue] = useState<(typeof colors)[number]>();

  return (
    <Combobox
      items={useMemo(
        () =>
          colors.map<ComboboxOption>((color) => ({
            execute: () => setValue(color),
            label: color,
            selected: value === color,
          })),
        [value],
      )}
    >
      <ComboboxTrigger>Select color</ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
