"use client";

import { Box } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxContent,
  type ComboboxOption,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

import { type Color, colors } from "./data";

export function App() {
  const [value, setValue] = useState<Color[]>([]);

  return (
    <Combobox
      items={useMemo(
        () =>
          colors.map<ComboboxOption>((color) => ({
            addon: (
              <Box
                rounded="full"
                size="10"
                style={{ backgroundColor: color.color }}
              />
            ),
            execute: () =>
              setValue((value) =>
                value.includes(color)
                  ? value.filter((v) => v !== color)
                  : [...value, color],
              ),
            label: color.label,
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
