"use client";

import {
  Select,
  SelectContent,
  SelectRadioItem,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Select items={colors}>
      <SelectTrigger placeholder="Select colors..." />
      <SelectContent>
        {colors.map((item) => (
          <SelectRadioItem item={item} key={item}>
            {item}
          </SelectRadioItem>
        ))}
      </SelectContent>
    </Select>
  );
}
