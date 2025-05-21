"use client";

import {
  Sortable,
  SortableHandle,
  SortableItem,
} from "@optiaxiom/react/unstable";
import { IconGripVertical } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [items, setItems] = useState(["A", "B", "C"]);

  return (
    <Sortable items={items} onItemsChange={setItems}>
      {(item) => (
        <SortableItem alignItems="center" border="1" display="flex">
          <SortableHandle>
            <IconGripVertical size={20} />
          </SortableHandle>
          Item {item}
        </SortableItem>
      )}
    </Sortable>
  );
}
