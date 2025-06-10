"use client";

import { Box } from "@optiaxiom/react";
import {
  Sortable,
  SortableItem,
  SortableList,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [items, setItems] = useState({
    A: ["A1", "A2", "A3"],
    B: ["B1", "B2"],
    C: [],
  });

  return (
    <Sortable
      alignItems="stretch"
      display="grid"
      flexDirection="row"
      fontFamily="mono"
      fontSize="md"
      fontWeight="600"
      gridTemplateColumns="3"
      h="384"
      items={items}
      onItemsChange={setItems}
    >
      {({ id, isDropTarget }) => (
        <Box
          bg={isDropTarget ? "bg.warning.subtle" : "bg.secondary"}
          display="flex"
          flexDirection="column"
          overflow="hidden"
          rounded="sm"
          transition="colors"
        >
          <Box
            bg={isDropTarget ? "bg.warning.light" : "bg.avatar.neutral"}
            p="12"
            transition="colors"
          >
            {id}
          </Box>
          <SortableList flex="1" p="12">
            {({ id }) => (
              <SortableItem
                bg="bg.default"
                p="12"
                rounded="sm"
                textAlign="center"
                w="224"
              >
                Item {id}
              </SortableItem>
            )}
          </SortableList>
        </Box>
      )}
    </Sortable>
  );
}
