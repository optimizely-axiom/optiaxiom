"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

import { useSet } from "./useSet";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [items, setItems] = useState(colors);
  const [value, { toggle }] = useSet<string>([]);

  return (
    <Menu
      options={useMemo<MenuOption[]>(
        () => [
          ...items.map<MenuOption>((color) => ({
            execute: () => toggle(color),
            label: color,
            selected: value.includes(color),
          })),
          {
            detail: ({ inputValue }) => `"${inputValue}"`,
            execute: ({ inputValue }) => {
              if (inputValue) {
                setItems((items) => [...items, inputValue]);
              }
            },
            label: "Create: ",
            visible: ({ inputValue }) =>
              inputValue
                ? !items.find(
                    (item) => item.toLowerCase() === inputValue.toLowerCase(),
                  )
                : false,
          },
        ],
        [items, toggle, value],
      )}
    >
      <MenuTrigger w="224">Select colors</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
