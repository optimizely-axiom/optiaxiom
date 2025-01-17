"use client";

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteRadioItem,
  AutocompleteTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

import { type Color, colors } from "./data";

export function App() {
  const [items, setItems] = useState(colors);
  const [value, setValue] = useState<Color | null>(null);

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
    <Autocomplete
      items={filteredItems}
      itemToString={(item) => item?.label || ""}
      onInputValueChange={setInputValue}
      onValueChange={(value) => {
        if (value?.new) {
          const newItem = { label: value.label };
          setItems((items) => [...items, newItem]);
          setValue(newItem);
        } else {
          setValue(value);
        }
      }}
      value={value}
    >
      <AutocompleteTrigger placeholder="Search a color..." w="224" />

      <AutocompleteContent>
        {filteredItems.map((item) => (
          <AutocompleteRadioItem item={item} key={item.label}>
            {item.new ? `Create "${item.label}"` : item.label}
          </AutocompleteRadioItem>
        ))}

        {filteredItems.length === 0 && (
          <AutocompleteEmpty>No result found</AutocompleteEmpty>
        )}
      </AutocompleteContent>
    </Autocomplete>
  );
}
