"use client";

import { IconGrip } from "@optiaxiom/icons";
import {
  Sortable,
  SortableHandle,
  SortableItem,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [items, setItems] = useState(["A", "B", "C"]);

  return (
    <Sortable items={items} onItemsChange={setItems}>
      {(items) =>
        items.map((item, index) => (
          <SortableItem
            alignItems="center"
            border="1"
            display="flex"
            index={index}
            item={item}
            key={item}
          >
            <SortableHandle>
              <IconGrip />
            </SortableHandle>
            Item {item}
          </SortableItem>
        ))
      }
    </Sortable>
  );
}
