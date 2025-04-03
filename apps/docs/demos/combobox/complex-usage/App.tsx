"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

import { type Color, colors } from "./data";

export function App() {
  const [value, setValue] = useState<Color>();

  return (
    <Combobox
      defaultItems={colors}
      isItemSelected={(item) => value === item}
      itemToLabel={(item) => (item ? item.label : "")}
      onItemSelect={(value) =>
        setValue((prev) => (prev !== value ? value : undefined))
      }
    >
      <ComboboxTrigger w="224">Select colors</ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
