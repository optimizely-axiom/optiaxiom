"use client";

import { Menu, MenuContent, MenuTrigger } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Menu empty="No colors available." inputVisible="always" options={[]}>
      <MenuTrigger>Select color</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
