"use client";

import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Combobox
      defaultItems={colors}
      isItemSelected={(item) => value.includes(item)}
      onItemSelect={(value) =>
        setValue((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value],
        )
      }
    >
      <ComboboxTrigger w="224">Select colors</ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxListbox>
          {(item) => (
            <ComboboxCheckboxItem item={item}>{item}</ComboboxCheckboxItem>
          )}
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>
  );
}
