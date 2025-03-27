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

const colors = Array.from({ length: 2000 }).map(
  (_, index) => `Color ${index + 1}`,
);

export function App() {
  const [items, setItems] = useState(colors);
  const [value, setValue] = useState([colors[0]]);

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
      <ComboboxTrigger placeholder="Search a color..." w="224" />

      <ComboboxContent>
        <ComboboxInput />

        <ComboboxScrollArea>
          {(item) => (
            <ComboboxCheckboxItem item={item} key={item}>
              {item}
            </ComboboxCheckboxItem>
          )}
        </ComboboxScrollArea>

        {items.length === 0 && <ComboboxEmpty>No result found</ComboboxEmpty>}
      </ComboboxContent>
    </Combobox>
  );
}
