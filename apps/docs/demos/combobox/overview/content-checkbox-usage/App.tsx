"use client";

import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
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
            <ComboboxCheckboxItem item={item} key={item}>
              {item}
            </ComboboxCheckboxItem>
          ))}
        </ComboboxScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}
