"use client";

import { IconFileLines, IconFolder } from "@optiaxiom/icons";
import { Group, Text } from "@optiaxiom/react";
import { Tree, type TreeOption } from "@optiaxiom/react/unstable";
import { useState } from "react";

const options: TreeOption[] = [
  {
    children: [
      { icon: <IconFileLines />, label: "Features", value: "features" },
      { icon: <IconFileLines />, label: "Pricing", value: "pricing" },
    ],
    icon: <IconFolder />,
    label: "Products",
    value: "products",
  },
  { icon: <IconFileLines />, label: "About us", value: "about" },
];

export function App() {
  const [expanded, setExpanded] = useState(["products"]);
  const [value, setValue] = useState(["features"]);

  return (
    <Group alignItems="start" flexDirection="column" gap="16">
      <Tree
        aria-label="Pages"
        expanded={expanded}
        onExpandedChange={setExpanded}
        onValueChange={setValue}
        options={options}
        value={value}
        w="224"
      />

      <Text color="fg.secondary" fontSize="sm">
        Selected: {value.join(", ") || "none"}
      </Text>
      <Text color="fg.secondary" fontSize="sm">
        Expanded: {expanded.join(", ") || "none"}
      </Text>
    </Group>
  );
}
