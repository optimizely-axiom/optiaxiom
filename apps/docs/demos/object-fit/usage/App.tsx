"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Box, Group, theme } from "@optiaxiom/react";

export function App({
  objectFit = "cover",
}: Pick<ComponentPropsWithoutRef<typeof Group>, "objectFit">) {
  return (
    <Group
      flexDirection="column"
      gap="16"
      rounded="md"
      style={{ aspectRatio: 3, ...stripes }}
      w="full"
    >
      <Box asChild objectFit={objectFit} rounded="inherit" size="full">
        <img
          alt="brown glass bottle beside white book on blue and white textile"
          src="https://picsum.photos/seed/optiaxiom/640/427"
        />
      </Box>
    </Group>
  );
}

const stripes = {
  backgroundColor: theme.colors["bg.secondary"],
  backgroundImage: `
    linear-gradient(
      135deg,
      ${theme.colors["bg.avatar.neutral"]} 10%,
      transparent 0,
      transparent 50%,
      ${theme.colors["bg.avatar.neutral"]} 0,
      ${theme.colors["bg.avatar.neutral"]} 60%,
      transparent 0,
      transparent
    )
  `,
  backgroundSize: "7px 7px",
};
