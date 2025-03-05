"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Combobox items={colors}>
      <ComboboxTrigger placeholder="Select colors..." />
      <ComboboxContent />
    </Combobox>
  );
}
