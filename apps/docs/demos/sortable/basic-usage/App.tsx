"use client";

import { Sortable, SortableItem } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Sortable items={["A", "B", "C"]}>
      {(items) =>
        items.map((item, index) => (
          <SortableItem border="1" index={index} item={item} key={item}>
            {index}. Item {item}
          </SortableItem>
        ))
      }
    </Sortable>
  );
}
