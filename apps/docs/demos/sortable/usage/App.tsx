"use client";

import { Box } from "@optiaxiom/react";
import { Sortable } from "@optiaxiom/react/unstable";
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
      {(item) => (
        <Box
          bg="bg.avatar.neutral"
          p="12"
          rounded="sm"
          textAlign="center"
          w="224"
        >
          Item {item}
        </Box>
      )}
    </Sortable>
  );
}
