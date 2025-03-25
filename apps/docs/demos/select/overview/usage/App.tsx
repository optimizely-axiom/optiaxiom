"use client";

import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@optiaxiom/react/unstable";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Select items={colors}>
      <SelectTrigger placeholder="Select colors..." />
      <SelectContent />
    </Select>
  );
}
