"use client";

import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useEffect, useState } from "react";

import { colors } from "./data";

export function App() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const filteredItems = inputValue
    ? items.filter((color) => color.toLowerCase().includes(inputValue))
    : items;

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setItems(open ? colors : []), 3000);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Combobox
      items={filteredItems}
      onInputValueChange={setInputValue}
      onOpenChange={setOpen}
      open={open}
    >
      <ComboboxTrigger w="224">Select colors</ComboboxTrigger>

      <ComboboxContent>
        <ComboboxInput />

        <ComboboxListbox loading={items.length === 0}>
          {filteredItems.map((item) => (
            <ComboboxCheckboxItem item={item} key={item}>
              {item}
            </ComboboxCheckboxItem>
          ))}

          {filteredItems.length === 0 && (
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          )}
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>
  );
}
