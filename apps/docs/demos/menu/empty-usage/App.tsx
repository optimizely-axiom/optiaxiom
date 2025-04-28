"use client";

import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react/unstable";

const colors = [
  { label: "Ocean" },
  { label: "Blue" },
  { label: "Purple" },
  { label: "Red" },
  { label: "Orange" },
  { label: "Yellow" },
];

export function App() {
  return (
    <Menu empty="No colors matched." initialInputVisible options={colors}>
      <MenuTrigger>Select color</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
