"use client";

import { Sortable, SortableItem } from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [items, setItems] = useState(["A", "B", "C"]);

  return (
    <Sortable
      alignItems="center"
      fontFamily="mono"
      fontSize="md"
      fontWeight="600"
      items={items}
      onItemsChange={setItems}
    >
      {(items) =>
        items.map((item, index) => (
          <SortableItem
            bg="bg.avatar.neutral"
            index={index}
            item={item}
            key={item}
            p="12"
            rounded="sm"
            textAlign="center"
            w="224"
          >
            Item {item}
          </SortableItem>
        ))
      }
    </Sortable>
  );
}
