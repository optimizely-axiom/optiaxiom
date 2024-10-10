"use client";

import type { ComponentPropsWithRef } from "react";

import { Box, Flex, type Sprinkles, Text } from "@optiaxiom/react";
import { useTheme } from "nextra-theme-docs";

const pattern = /\((?<light>.+),\s?(?<dark>.+)\)/;

export function ColorTokenItem({
  item,
  ...props
}: {
  item: {
    bg: Sprinkles["bg"];
    name: string;
    value: string;
  };
} & ComponentPropsWithRef<typeof Box>) {
  const { resolvedTheme: theme = "light" } = useTheme();
  const name = (
    item.name.startsWith("ld(") ? item.name : `ld(${item.name}, ${item.name})`
  ).match(pattern)?.groups?.[theme];
  const value = (
    item.value.startsWith("ld(")
      ? item.value
      : `ld(${item.value}, ${item.value})`
  ).match(pattern)?.groups?.[theme];

  return (
    <Flex alignItems="start" flexDirection="row" {...props}>
      <Box
        bg={item.bg}
        rounded="sm"
        style={{
          aspectRatio: 100 / 70,
          border: `1px solid oklch(from ${value} calc(l - 0.1) c h)`,
        }}
        suppressHydrationWarning
        w="48"
      />
      <Box flex="1">
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
    </Flex>
  );
}
