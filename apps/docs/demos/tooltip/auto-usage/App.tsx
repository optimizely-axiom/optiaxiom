"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Link, Text, Tooltip } from "@optiaxiom/react";

export function App({
  auto = true,
}: Pick<ComponentPropsWithoutRef<typeof Tooltip>, "auto">) {
  return (
    <Box fontSize="md" w="224">
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
    </Box>
  );
}
