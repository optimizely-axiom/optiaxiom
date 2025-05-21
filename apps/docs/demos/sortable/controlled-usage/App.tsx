"use client";

import { Sortable, SortableItem } from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [items, setItems] = useState(["A", "B", "C"]);

  return (
    <Sortable items={items} onItemsChange={setItems}>
      {(item) => <SortableItem border="1">Item {item}</SortableItem>}
    </Sortable>
  );
}
