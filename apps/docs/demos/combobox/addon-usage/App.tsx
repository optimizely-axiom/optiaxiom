"use client";

import { Box } from "@optiaxiom/react";
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

export function App() {
  const [value, setValue] = useState<Color[]>([]);

  return (
    <Combobox
      defaultItems={colors}
      isItemSelected={(item) => value.includes(item)}
      itemToLabel={(item) => (item ? item.label : "")}
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
          {(item) => (
            <ComboboxCheckboxItem
              icon={
                <Box
                  rounded="sm"
                  style={{ aspectRatio: 1, backgroundColor: item.color }}
                />
              }
              item={item}
            >
              {item.label}
            </ComboboxCheckboxItem>
          )}
        </ComboboxListbox>
      </ComboboxContent>
    </Combobox>
  );
}
