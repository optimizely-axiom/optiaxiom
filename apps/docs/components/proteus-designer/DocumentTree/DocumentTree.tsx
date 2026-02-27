"use client";

import { Box, type BoxProps, Group, Heading } from "@optiaxiom/react";

import { TreeNode } from "./TreeNode";

interface DocumentTreeProps extends BoxProps {
  document: Record<string, unknown>;
  onElementSelect: (path: string) => void;
  onInsert: (path: string, element: object) => void;
  onRemove: (path: string) => void;
  selectedPath: null | string;
}

export function DocumentTree({
  document,
  onElementSelect: onSelect,
  onInsert,
  onRemove,
  selectedPath,
  ...props
}: DocumentTreeProps) {
  return (
    <Group
      display="flex"
      flexDirection="column"
      fontSize="sm"
      gap="0"
      overflow="auto"
      p="8"
      {...props}
    >
      <Heading flex="none" fontSize="sm" level="3" px="4">
        Document Structure
      </Heading>
      <Box flex="1" overflow="auto">
        <TreeNode
          depth={0}
          element={document}
          label="Document"
          onInsert={onInsert}
          onRemove={onRemove}
          onSelect={onSelect}
          path=""
          selectedPath={selectedPath}
          subtitle={String(document.title ?? "")}
        />
      </Box>
    </Group>
  );
}
