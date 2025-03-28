"use client";

import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxInput,
  ComboboxScrollArea,
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
      <ComboboxTrigger placeholder="Search a color..." w="224" />

      <ComboboxContent>
        <ComboboxInput />
        <ComboboxScrollArea>
          {(item) => (
            <ComboboxCheckboxItem item={item} key={item.label}>
              {item.label}
            </ComboboxCheckboxItem>
          )}
        </ComboboxScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}
