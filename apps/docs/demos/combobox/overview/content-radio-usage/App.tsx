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
    <Combobox items={colors}>
      <ComboboxTrigger placeholder="Select colors..." />
      <ComboboxContent>
        <ComboboxScrollArea>
          {colors.map((item) => (
            <ComboboxRadioItem item={item} key={item}>
              {item}
            </ComboboxRadioItem>
          ))}
        </ComboboxScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}
