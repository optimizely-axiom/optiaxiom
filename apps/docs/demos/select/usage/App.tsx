"use client";

import { Box } from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectRadioItem,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

import { colors } from "./data";

export function App() {
  return (
    <Select
      isItemDisabled={(item) => Boolean(item.isDisabled)}
      items={colors}
      itemToString={(item) => (item ? item.label : "")}
    >
      <SelectTrigger placeholder="Select a color..." />

      <SelectContent>
        {colors.map((color) => (
          <SelectRadioItem
            icon={
              <Box
                rounded="sm"
                style={{ aspectRatio: 1, backgroundColor: color.color }}
              />
            }
            item={color}
            key={color.value}
          >
            {color.label}
          </SelectRadioItem>
        ))}
      </SelectContent>
    </Select>
  );
}
