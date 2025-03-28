"use client";

import { Box } from "@optiaxiom/react";
import {
  Select,
  SelectContent,
  SelectRadioItem,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

const colors = ["Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Select items={colors}>
      <SelectTrigger placeholder="Select a color..." />
      <SelectContent>
        {colors.map((color) => (
          <SelectRadioItem
            icon={
              <Box
                rounded="sm"
                style={{ aspectRatio: 1, backgroundColor: color }}
              />
            }
            item={color}
            key={color}
          >
            {color}
          </SelectRadioItem>
        ))}
      </SelectContent>
    </Select>
  );
}
