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
  const [value, setValue] = useState(
    colors.filter((_, index) => index % 3 === 0),
  );

  return (
    <PillMenu
      options={useMemo(
        () =>
          colors.map(
            (color) =>
              ({
                execute: () =>
                  setValue((values) =>
                    values.includes(color)
                      ? values.filter((v) => v !== color)
                      : [...values, color],
                  ),
                label: color,
                multi: true,
                selected: () => value.includes(color),
              }) satisfies MenuOption,
          ),
        [value],
      )}
    >
      <PillMenuTrigger>Add color</PillMenuTrigger>
      <PillMenuContent />
    </PillMenu>
  );
}
