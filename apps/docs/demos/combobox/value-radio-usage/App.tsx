"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [value, setValue] = useState<string>();

  return (
    <Combobox
      defaultItems={colors}
      isItemSelected={(item) => item === value}
      onItemSelect={(value) =>
        setValue((prev) => (prev !== value ? value : undefined))
      }
    >
      <ComboboxTrigger w="224">Select color</ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
