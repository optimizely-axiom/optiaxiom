"use client";

import {
  Combobox,
  ComboboxContent,
  type ComboboxOption,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

import { useSet } from "./useSet";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [items, setItems] = useState(colors);
  const [value, { toggle }] = useSet<string>([]);

  return (
    <Combobox
      items={useMemo<ComboboxOption[]>(
        () => [
          ...items.map<ComboboxOption>((color) => ({
            execute: () => toggle(color),
            label: color,
            selected: value.includes(color),
          })),
          {
            detail: ({ inputValue }) => `"${inputValue}"`,
            execute: ({ inputValue }) => {
              if (inputValue) {
                setItems((items) => [...items, inputValue]);
              }
            },
            label: "Create: ",
            visible: ({ inputValue }) =>
              inputValue
                ? !items.find(
                    (item) => item.toLowerCase() === inputValue.toLowerCase(),
                  )
                : false,
          },
        ],
        [items, toggle, value],
      )}
    >
      <ComboboxTrigger w="224">Select colors</ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
