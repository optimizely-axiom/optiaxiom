"use client";

import { toaster } from "@optiaxiom/react";
import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  return (
    <Menu
      options={useMemo(
        () =>
          colors.map<MenuOption>((color) => ({
            execute: () => {
              toaster.create(`Clicked "${color}"`);
            },
            label: color,
          })),
        [],
      )}
    >
      <MenuTrigger>Select color</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
