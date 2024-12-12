"use client";

import type { ComponentPropsWithRef } from "react";

import { theme } from "@optiaxiom/globals";
import { Box, Flex, Text } from "@optiaxiom/react";
import { useTheme } from "nextra-theme-docs";

const pattern = /\((?<light>.+),\s?(?<dark>.+)\)/;

export function ColorTokenItem({
  item,
  ...props
}: ComponentPropsWithRef<typeof Box> & {
  item: {
    bg: keyof typeof theme.colors;
    name: string;
    value: string;
  };
}) {
  const { resolvedTheme = "light" } = useTheme();
  const name = (
    item.name.startsWith("ld(") ? item.name : `ld(${item.name}, ${item.name})`
  ).match(pattern)?.groups?.[resolvedTheme];
  const value = (
    item.value.startsWith("ld(")
      ? item.value
      : `ld(${item.value}, ${item.value})`
  ).match(pattern)?.groups?.[resolvedTheme];

  return (
    <Flex alignItems="start" flexDirection="row" {...props}>
      <Box display={["none", "block"]} flex="1">
        <Text fontSize="sm" fontWeight="600" suppressHydrationWarning>
          {name}
        </Text>
        <Text
          color="fg.secondary"
          fontSize="sm"
          mt="2"
          suppressHydrationWarning
        >
          {value}
        </Text>
      </Box>
      <Box
        rounded="sm"
        style={{
          aspectRatio: 100 / 70,
          backgroundColor: theme.colors[item.bg],
          border: `1px solid oklch(from ${value} calc(l - 0.1) c h)`,
        }}
        suppressHydrationWarning
        w="xl"
      />
    </Flex>
  );
}
