"use client";

import { Flex } from "@optiaxiom/react";
import { Sortable, SortableItem } from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [items, setItems] = useState([{ id: "A" }, { id: "B" }, { id: "C" }]);

  return (
    <Flex alignItems="center" fontFamily="mono" fontSize="md" fontWeight="600">
      <Sortable onValueChange={setItems} value={items}>
        {items.map((item, index) => (
          <SortableItem
            bg="bg.avatar.neutral"
            index={index}
            item={item}
            key={item.id}
            p="12"
            rounded="sm"
            textAlign="center"
            w="224"
          >
            Item {item.id}
          </SortableItem>
        ))}
      </Sortable>
    </Flex>
  );
}
