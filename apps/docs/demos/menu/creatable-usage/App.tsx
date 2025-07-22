"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react";
import { useMemo, useState } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [items, setItems] = useState(colors);
  const [value, setValue] = useState<string>();

  return (
    <Menu
      options={useMemo<MenuOption[]>(
        () => [
          ...items.map<MenuOption>((color) => ({
            execute: () => setValue(color),
            label: color,
            selected: value === color,
          })),
          {
            detail: ({ inputValue }) => `"${inputValue}"`,
            execute: ({ inputValue }) => {
              if (inputValue) {
                setItems((items) => [...items, inputValue]);
                setValue(inputValue);
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
        [items, value],
      )}
    >
      <MenuTrigger w="224">{value || "Select colors"}</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
