"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Combobox
      defaultFilter={(color, inputValue) =>
        color.toLowerCase().startsWith(inputValue.toLowerCase())
      }
      defaultItems={colors}
    >
      <ComboboxTrigger placeholder="Select colors..." />
      <ComboboxContent />
    </Combobox>
  );
}
