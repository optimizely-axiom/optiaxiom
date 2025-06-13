"use client";

import { Box, Flex } from "@optiaxiom/react";
import {
  Sortable,
  SortableGroup,
  SortableItem,
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
      {(items) =>
        Object.entries(items).map(([column, items], index) => (
          <SortableGroup
            asChild
            gap="0"
            group={column}
            index={index}
            key={column}
            overflow="hidden"
            rounded="sm"
          >
            {(isDropTarget) => (
              <Box
                bg={isDropTarget ? "bg.warning.subtle" : "bg.secondary"}
                transition="colors"
              >
                <Box
                  bg={isDropTarget ? "bg.warning.light" : "bg.avatar.neutral"}
                  p="12"
                  transition="colors"
                >
                  {column}
                </Box>
                <Flex flex="1" justifyContent="flex-start" p="12">
                  {items.map((item, index) => (
                    <SortableItem
                      bg="bg.default"
                      index={index}
                      item={item}
                      key={item}
                      p="24"
                      rounded="sm"
                      textAlign="center"
                      w="224"
                    >
                      Item {item}
                    </SortableItem>
                  ))}
                </Flex>
              </Box>
            )}
          </SortableGroup>
        ))
      }
    </Sortable>
  );
}
