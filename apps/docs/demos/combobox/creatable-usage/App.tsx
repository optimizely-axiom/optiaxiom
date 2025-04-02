"use client";

import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

import { type Color, colors } from "./data";
import { useSet } from "./useSet";

export function App() {
  const [items, setItems] = useState(colors);
  const [value, { toggle }] = useSet<Color>([]);

  const [inputValue, setInputValue] = useState("");
  const filteredItems = inputValue
    ? [
        ...items.filter((color) =>
          color.label.toLowerCase().includes(inputValue.toLowerCase()),
        ),
        ...(items.find(
          (color) => color.label.toLowerCase() === inputValue.toLowerCase(),
        )
          ? []
          : [{ label: inputValue, new: true }]),
      ]
    : items;

  return (
    <Combobox
      inputValue={inputValue}
      isItemSelected={(item) => value.includes(item)}
      items={filteredItems}
      itemToLabel={(item) => item?.label || ""}
      onInputValueChange={setInputValue}
      onItemSelect={(value) => {
        if (value.new) {
          const newItem = { label: value.label };
          setItems((items) => [...items, newItem]);
          toggle(newItem);

          setInputValue("");
        } else {
          toggle(value);
        }
      }}
    >
      <ComboboxTrigger w="224">Select colors</ComboboxTrigger>

      <ComboboxContent>
        <ComboboxInput />

        <ComboboxListbox>
          {filteredItems.map((item) => (
            <ComboboxCheckboxItem item={item} key={item.label}>
              {item.new ? `Create "${item.label}"` : item.label}
            </ComboboxCheckboxItem>
          ))}
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>
  );
}
