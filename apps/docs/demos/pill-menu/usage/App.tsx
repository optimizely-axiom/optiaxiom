"use client";

import { type MenuOption } from "@optiaxiom/react";
import {
  PillMenu,
  PillMenuContent,
  PillMenuTrigger,
} from "@optiaxiom/react/unstable";
import { useMemo, useState } from "react";

const colors = ["Ocean", "Blue", "Purple", "Red", "Orange", "Yellow"];

export function App() {
  const [selected, setSelected] = useState(
    colors.filter((_, index) => index % 3 === 0),
  );

  const options = useMemo(
    () =>
      colors.map(
        (color) =>
          ({
            execute: () =>
              setSelected((values) =>
                values.includes(color)
                  ? values.filter((v) => v !== color)
                  : [...values, color],
              ),
            label: color,
            multi: true,
            selected: () => selected.includes(color),
          }) satisfies MenuOption,
      ),
    [selected],
  );
  const value = useMemo(
    () => options.filter((option) => selected.includes(option.label)),
    [options, selected],
  );

  return (
    <PillMenu options={options} value={value}>
      <PillMenuTrigger>Add color</PillMenuTrigger>
      <PillMenuContent />
    </PillMenu>
  );
}
