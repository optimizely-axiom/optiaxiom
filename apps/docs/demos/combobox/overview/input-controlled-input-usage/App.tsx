"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [inputValue, setInputValue] = useState("");
  const items = inputValue
    ? colors.filter((color) =>
        color.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : colors;

  return (
    <Combobox
      inputValue={inputValue}
      items={items}
      onInputValueChange={setInputValue}
    >
      <ComboboxTrigger placeholder="Select colors..." />
      <ComboboxContent />
    </Combobox>
  );
}
