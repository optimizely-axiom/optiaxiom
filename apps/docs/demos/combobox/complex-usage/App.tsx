"use client";

import { Box } from "@optiaxiom/react";
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

export function App() {
  const [items, setItems] = useState(colors);
  const [value, setValue] = useState<Color[]>([]);

  return (
    <Combobox
      isItemDisabled={(item) => Boolean(item.isDisabled)}
      items={items}
      itemToString={(item) => (item ? item.label : "")}
      onInputValueChange={(inputValue) => {
        setItems(
          inputValue
            ? colors.filter((color) =>
                new RegExp(inputValue, "i").test(color.label),
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
      value={value}
    >
      <ComboboxTrigger placeholder="Search a color..." w="224" />

      <ComboboxContent>
        <ComboboxInput />

        <ComboboxScrollArea>
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

          {items.length === 0 && <ComboboxEmpty>No result found</ComboboxEmpty>}
        </ComboboxScrollArea>
      </ComboboxContent>
    </Combobox>
  );
}
