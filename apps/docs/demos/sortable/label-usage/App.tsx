"use client";

import { IconGrip } from "@optiaxiom/icons";
import {
  Sortable,
  SortableHandle,
  SortableItem,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [items, setItems] = useState([
    { id: "task-1", label: "Planning" },
    { id: "task-2", label: "Design" },
    { id: "task-3", label: "Review" },
  ]);

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
            key={item.id}
          >
            <SortableHandle>
              <IconGrip />
            </SortableHandle>
            {item.label}
          </SortableItem>
        ))
      }
    </Sortable>
  );
}
