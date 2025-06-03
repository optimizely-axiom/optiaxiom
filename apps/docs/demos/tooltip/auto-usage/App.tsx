"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Flex, Link, Text, Tooltip } from "@optiaxiom/react";

export function App({
  auto = true,
}: Pick<ComponentPropsWithoutRef<typeof Tooltip>, "auto">) {
  return (
    <Flex alignItems="start" fontSize="md" w="224">
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
    </Flex>
  );
}
