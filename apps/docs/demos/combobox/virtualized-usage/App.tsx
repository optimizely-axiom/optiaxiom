"use client";

import {
  Combobox,
  ComboboxContent,
  type ComboboxOption,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

const colors = Array.from({ length: 2000 }).map(
  (_, index) => `Color ${index + 1}`,
);

export function App() {
  const [value, setValue] = useState([colors[0]]);

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
            selected: () => value.includes(color),
          })),
        [value],
      )}
    >
      <ComboboxTrigger w="224">Select colors</ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
