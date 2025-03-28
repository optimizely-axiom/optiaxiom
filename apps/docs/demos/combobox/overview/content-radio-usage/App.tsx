"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxRadioItem,
  ComboboxScrollArea,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Combobox defaultItems={colors}>
      <ComboboxTrigger placeholder="Select colors..." />
      <ComboboxContent>
        <ComboboxScrollArea>
          {(item) => <ComboboxRadioItem item={item}>{item}</ComboboxRadioItem>}
        </ComboboxScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}
