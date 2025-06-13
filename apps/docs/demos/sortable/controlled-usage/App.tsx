"use client";

import { Sortable, SortableItem } from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [items, setItems] = useState(["A", "B", "C"]);

  return (
    <Sortable items={items} onItemsChange={setItems}>
      {(items) =>
        items.map((item, index) => (
          <SortableItem border="1" index={index} item={item} key={item}>
            Item {item}
          </SortableItem>
        ))
      }
    </Sortable>
  );
}
