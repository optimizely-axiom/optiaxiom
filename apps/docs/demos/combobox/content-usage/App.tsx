"use client";

import { toaster } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxContent,
  type ComboboxOption,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Combobox
      items={useMemo(
        () =>
          colors.map<ComboboxOption>((color) => ({
            execute: () => {
              toaster.create(`Clicked "${color}"`);
            },
            label: color,
          })),
        [],
      )}
    >
      <ComboboxTrigger>Select color</ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
