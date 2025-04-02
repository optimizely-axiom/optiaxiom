"use client";

import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";

import { colors } from "./data";
import { useSet } from "./useSet";

export function App() {
  const [value, { toggle }] = useSet([colors[1]]);

  return (
    <Combobox
      defaultItems={colors}
      isItemSelected={(item) => value.includes(item)}
      itemToLabel={(item) => item?.label || ""}
      onItemSelect={(value) => toggle(value)}
    >
      <ComboboxTrigger w="224">Select colors</ComboboxTrigger>

      <ComboboxContent>
        <ComboboxInput />
        <ComboboxListbox>
          {(item) => (
            <ComboboxCheckboxItem item={item} key={item.label}>
              {item.label}
            </ComboboxCheckboxItem>
          )}
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>
  );
}
