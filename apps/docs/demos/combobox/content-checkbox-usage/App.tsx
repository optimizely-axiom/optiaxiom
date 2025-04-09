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
  const [value, setValue] = useState<string[]>([]);

  return (
    <Combobox
      items={useMemo(
        () =>
          colors.map<ComboboxOption>((color) => ({
            execute: () =>
              setValue((value) =>
                value.includes(color)
                  ? value.filter((v) => v !== color)
                  : [...value, color],
              ),
            label: color,
            multi: true,
            selected: value.includes(color),
          })),
        [value],
      )}
    >
      <ComboboxTrigger>Select color</ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
