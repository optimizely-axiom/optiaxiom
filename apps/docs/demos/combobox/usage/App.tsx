"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

import { colors } from "./data";

export function App() {
  const [value, setValue] = useState<string>();

  return (
    <Combobox
      defaultItems={colors}
      isItemSelected={(item) => item === value}
      onItemSelect={setValue}
    >
      <ComboboxTrigger placeholder="Select a color..." w="224" />
      <ComboboxContent />
    </Combobox>
  );
}
