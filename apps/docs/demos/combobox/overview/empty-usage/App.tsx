"use client";

import {
  Combobox,
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
            ? colors.filter((color) =>
                color.toLowerCase().includes(inputValue.toLowerCase()),
              )
            : colors,
        );
      }}
    >
      <ComboboxTrigger placeholder="Select colors..." />
      <ComboboxContent>
        <ComboboxInput />
        <ComboboxScrollArea />
        {items.length === 0 && <ComboboxEmpty>No result found</ComboboxEmpty>}
      </ComboboxContent>
    </Combobox>
  );
}
