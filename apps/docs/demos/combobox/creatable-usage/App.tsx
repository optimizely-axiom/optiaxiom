"use client";

import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxScrollArea,
  ComboboxTrigger,
  ComboboxValue,
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
          new RegExp(inputValue, "i").test(color.label),
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
      items={filteredItems}
      itemToString={(item) => item?.label || ""}
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
      value={value}
    >
      <ComboboxTrigger w="224">
        <ComboboxValue placeholder="Search a color..." />
      </ComboboxTrigger>

      <ComboboxContent>
        <ComboboxInput />

        <ComboboxScrollArea>
          {filteredItems.map((item) => (
            <ComboboxCheckboxItem item={item} key={item.label}>
              {item.new ? `Create "${item.label}"` : item.label}
            </ComboboxCheckboxItem>
          ))}

          {filteredItems.length === 0 && (
            <ComboboxEmpty>No result found</ComboboxEmpty>
          )}
        </ComboboxScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}
