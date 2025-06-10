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
      {({ id }) => (
        <SortableItem
          bg="bg.avatar.neutral"
          p="12"
          rounded="sm"
          textAlign="center"
          w="224"
        >
          Item {id}
        </SortableItem>
      )}
    </Sortable>
  );
}
