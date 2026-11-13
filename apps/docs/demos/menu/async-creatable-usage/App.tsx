"use client";

import {
  Menu,
  MenuContent,
  type MenuOption,
  MenuTrigger,
} from "@optiaxiom/react";
import { useState } from "react";

const createColor = (label: string) =>
  new Promise<string>((resolve) => setTimeout(() => resolve(label), 1000));

export function App() {
  const [items, setItems] = useState(["Ocean", "Blue", "Purple"]);
  const [value, setValue] = useState<string>();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  return (
    <Menu
      loading={saving && "spinner"}
      onOpenChange={setOpen}
      open={open}
      options={[
        ...items.map<MenuOption>((color) => ({
          execute: ({ dismiss }) => {
            setValue(color);
            if (dismiss) {
              setOpen(false);
            }
          },
          label: color,
          selected: value === color,
        })),
        {
          detail: ({ inputValue }) => `"${inputValue}"`,
          execute: ({ inputValue }) => {
            if (!inputValue || saving) {
              return;
            }
            setSaving(true);
            void createColor(inputValue)
              .then((color) => {
                setItems((items) => [...items, color]);
                setValue(color);
                setOpen(false);
              })
              .finally(() => setSaving(false));
          },
          label: "Create: ",
          visible: ({ inputValue }) =>
            inputValue
              ? !items.find(
                  (item) => item.toLowerCase() === inputValue.toLowerCase(),
                )
              : false,
        },
      ]}
    >
      <MenuTrigger w="224">{value || "Select colors"}</MenuTrigger>
      <MenuContent />
    </Menu>
  );
}
