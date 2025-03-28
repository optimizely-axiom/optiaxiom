"use client";

import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxInput,
  ComboboxScrollArea,
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
      <ComboboxTrigger placeholder="Select colors..." w="224" />
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxScrollArea>
          {(item) => (
            <ComboboxCheckboxItem item={item}>{item}</ComboboxCheckboxItem>
          )}
        </ComboboxScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}
