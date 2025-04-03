"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

const priorities = ["No priority", "Urgent", "High", "Medium", "Low"];

export function App() {
  const [value, setValue] = useState<string>("No priority");

  return (
    <Combobox
      defaultItems={priorities}
      isItemSelected={(item) => item === value}
      onItemSelect={setValue}
    >
      <ComboboxTrigger w="224">
        {value !== "No priority" ? value : "Set priority"}
      </ComboboxTrigger>
      <ComboboxContent />
    </Combobox>
  );
}
