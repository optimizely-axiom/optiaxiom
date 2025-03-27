"use client";

import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxScrollArea,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

import { colors } from "./data";

export function App() {
  const [items, setItems] = useState(colors);
  const [value, setValue] = useState<string[]>([]);

  return (
    <Combobox
      isItemSelected={(item) => value.includes(item)}
      items={items}
      onInputValueChange={(inputValue) => {
        setItems(
          inputValue
            ? colors.filter((color) => new RegExp(inputValue, "i").test(color))
            : colors,
        );
      }}
      onItemSelect={(value) =>
        setValue((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value],
        )
      }
    >
      <ComboboxTrigger placeholder="Select colors..." w="224" />

      <ComboboxContent>
        <ComboboxInput />

        <ComboboxScrollArea>
          {items.map((item) => (
            <ComboboxCheckboxItem item={item} key={item}>
              {item}
            </ComboboxCheckboxItem>
          ))}

          {items.length === 0 && <ComboboxEmpty>No result found</ComboboxEmpty>}
        </ComboboxScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}
