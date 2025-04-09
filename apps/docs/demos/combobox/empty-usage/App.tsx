"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

const colors = [
  { label: "Ocean" },
  { label: "Blue" },
  { label: "Purple" },
  { label: "Red" },
  { label: "Orange" },
  { label: "Yellow" },
];

export function App() {
  return (
    <Combobox defaultInputVisible empty="No colors matched." items={colors}>
      <ComboboxTrigger>Select color</ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
