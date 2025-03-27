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
      <ComboboxTrigger placeholder="Search a color..." w="224" />

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
