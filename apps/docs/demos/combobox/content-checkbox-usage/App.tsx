"use client";

import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxListbox,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Combobox defaultItems={colors}>
      <ComboboxTrigger>Select colors</ComboboxTrigger>
      <ComboboxContent>
        <ComboboxListbox>
          {(item) => (
            <ComboboxCheckboxItem item={item}>{item}</ComboboxCheckboxItem>
          )}
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>
  );
}
