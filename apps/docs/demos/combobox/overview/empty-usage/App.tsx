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

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [items, setItems] = useState(colors);

  return (
    <Combobox
      items={items}
      onInputValueChange={(inputValue) => {
        setItems(
          inputValue
            ? colors.filter((color) => new RegExp(inputValue, "i").test(color))
            : colors,
        );
      }}
    >
      <ComboboxTrigger placeholder="Select colors..." />
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
