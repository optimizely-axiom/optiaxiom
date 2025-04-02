"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxListbox,
  ComboboxRadioItem,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Combobox defaultItems={colors}>
      <ComboboxTrigger>Select color</ComboboxTrigger>
      <ComboboxContent>
        <ComboboxListbox>
          {(item) => <ComboboxRadioItem item={item}>{item}</ComboboxRadioItem>}
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>
  );
}
