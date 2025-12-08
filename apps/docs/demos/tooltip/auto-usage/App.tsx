"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Group, Link, Text, Tooltip } from "@optiaxiom/react";

export function App({
  auto = true,
}: Pick<ComponentPropsWithoutRef<typeof Tooltip>, "auto">) {
  return (
    <Group
      alignItems="start"
      flexDirection="column"
      fontSize="md"
      gap="16"
      w="224"
    >
      <Tooltip
        auto={auto}
        content="The quick brown fox jumps over the lazy dog."
      >
        <Link href="data:,">
          <Text lineClamp="1">
            The quick brown fox jumps over the lazy dog.
          </Text>
        </Link>
      </Tooltip>
      <Tooltip auto={auto} content="Sample non-clipped link">
        <Link href="data:,">Sample non-clipped link</Link>
      </Tooltip>
    </Group>
  );
}
