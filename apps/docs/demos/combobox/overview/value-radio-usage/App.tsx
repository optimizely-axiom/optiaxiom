"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxRadioItem,
  ComboboxScrollArea,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [items, setItems] = useState(colors);
  const [value, setValue] = useState<string>();

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
      onItemSelect={(value) =>
        setValue((prev) => (prev !== value ? value : undefined))
      }
      value={value ? [value] : undefined}
    >
      <ComboboxTrigger placeholder="Select colors..." />
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxScrollArea>
          {items.map((item) => (
            <ComboboxRadioItem item={item} key={item}>
              {item}
            </ComboboxRadioItem>
          ))}
        </ComboboxScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}
