"use client";

import { Box } from "@optiaxiom/react";
import {
  Combobox,
  ComboboxCheckboxItem,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

import { type Color, colors } from "./data";

export function App() {
  const [items, setItems] = useState(colors);
  const [value, setValue] = useState<Color[]>([]);

  return (
    <Combobox
      isItemDisabled={(item) => Boolean(item.isDisabled)}
      isItemSelected={(item) => value.includes(item)}
      items={items}
      itemToLabel={(item) => (item ? item.label : "")}
      onInputValueChange={(inputValue) => {
        setItems(
          inputValue
            ? colors.filter((color) =>
                color.label.toLowerCase().includes(inputValue.toLowerCase()),
              )
            : colors,
        );
      }}
      onItemSelect={(value) =>
        setValue((prev) =>
          prev.includes(value)
            ? prev.filter((v) => v !== value)
            : [...prev, value],
        )
      }
    >
      <ComboboxTrigger w="224">Select colors</ComboboxTrigger>

      <ComboboxContent>
        <ComboboxInput />

        <ComboboxListbox>
          {items.map((item) => (
            <ComboboxCheckboxItem
              icon={
                <Box
                  rounded="sm"
                  style={{ aspectRatio: 1, backgroundColor: item.color }}
                />
              }
              item={item}
              key={item.value}
            >
              {item.label}
            </ComboboxCheckboxItem>
          ))}

          {items.length === 0 && (
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          )}
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>
  );
}
