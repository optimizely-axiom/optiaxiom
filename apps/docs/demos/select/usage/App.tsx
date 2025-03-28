"use client";

import {
  Select,
  SelectContent,
  SelectRadioItem,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

import { colors } from "./data";

export function App() {
  return (
    <Select items={colors}>
      <SelectTrigger placeholder="Select a color..." w="224" />

      <SelectContent>
        {colors.map((color) => (
          <SelectRadioItem item={color} key={color}>
            {color}
          </SelectRadioItem>
        ))}
      </SelectContent>
    </Select>
  );
}
