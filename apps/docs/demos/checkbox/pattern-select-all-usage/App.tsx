"use client";

import { Checkbox, Group } from "@optiaxiom/react";
import { useState } from "react";

const fruits = ["Apple", "Banana", "Orange", "Mango"];

export function App() {
  const [selected, setSelected] = useState<string[]>([]);

  const allSelected = selected.length === fruits.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <Group flexDirection="column" gap="8">
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected}
        onCheckedChange={(checked) => {
          setSelected(checked ? [...fruits] : []);
        }}
      >
        Select All
      </Checkbox>

      <Group flexDirection="column" gap="8" pl="24">
        {fruits.map((fruit) => (
          <Checkbox
            checked={selected.includes(fruit)}
            key={fruit}
            onCheckedChange={(checked) => {
              setSelected((prev) =>
                checked
                  ? [...prev, fruit]
                  : prev.filter((item) => item !== fruit),
              );
            }}
          >
            {fruit}
          </Checkbox>
        ))}
      </Group>
    </Group>
  );
}
