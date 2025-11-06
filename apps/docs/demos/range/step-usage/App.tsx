"use client";

import { Range } from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState(85);
  return (
    <Range
      marks={[70, 80, 90, 100]}
      max={100}
      min={70}
      onValueChange={setValue}
      showTooltip
      step={5}
      value={value}
      w="384"
    />
  );
}
