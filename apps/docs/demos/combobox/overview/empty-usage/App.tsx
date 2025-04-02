"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxListbox,
  ComboboxRadioItem,
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
            ? colors.filter((color) =>
                color.toLowerCase().includes(inputValue.toLowerCase()),
              )
            : colors,
        );
      }}
    >
      <ComboboxTrigger>Select color</ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxListbox>
          {items.map((item) => (
            <ComboboxRadioItem item={item} key={item}>
              {item}
            </ComboboxRadioItem>
          ))}
          {items.length === 0 && (
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          )}
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>
  );
}
