"use client";

import { Sortable, SortableItem } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Sortable items={["A", "B", "C"]}>
      {(item, index) => (
        <SortableItem border="1">
          {index}. Item {item}
        </SortableItem>
      )}
    </Sortable>
  );
}
