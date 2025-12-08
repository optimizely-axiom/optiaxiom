import type { ComponentPropsWithoutRef } from "react";

import { Box, Group, theme } from "@optiaxiom/react";

export const IconButton = ({
  intent = "primary",
  style,
  ...props
}: ComponentPropsWithoutRef<typeof Box> & {
  intent?: "danger" | "primary" | "secondary";
}) => (
  <Group
    bg={intent === "danger" ? "bg.error" : "bg.default"}
    gap="16"
    p="4"
    px="8"
    rounded="sm"
    style={{
      ...(intent === "primary"
        ? { backgroundColor: theme.colors["border.focus"] }
        : intent === "secondary"
          ? {
              boxShadow: `inset 0 0 0 1px ${theme.colors["border.default"]}`,
            }
          : {}),
      ...style,
    }}
    {...props}
  />
);
