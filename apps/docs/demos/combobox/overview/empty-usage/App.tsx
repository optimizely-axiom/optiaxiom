"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxListbox,
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
                color.toLowerCase().startsWith(inputValue.toLowerCase()),
              )
            : colors,
        );
      }}
    >
      <ComboboxTrigger>Select color</ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxListbox empty="No colors matched." />
      </ComboboxContent>
    </Combobox>
  );
}
