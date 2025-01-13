import type { ComponentPropsWithoutRef } from "react";

import { Box, Flex, theme } from "@optiaxiom/react";

export const IconButton = ({
  intent = "primary",
  style,
  ...props
}: ComponentPropsWithoutRef<typeof Box> & {
  intent?: "danger" | "primary" | "secondary";
}) => (
  <Flex
    bg={intent === "danger" ? "bg.error" : "bg.default"}
    flexDirection="row"
    p="4"
    px="8"
    rounded="sm"
    style={{
      ...(intent === "primary"
        ? { backgroundColor: theme.colors["border.focus"] }
        : intent === "secondary"
          ? {
              boxShadow: `inset 0 0 0 1px ${theme.colors["border.tertiary"]}`,
            }
          : {}),
      ...style,
    }}
    {...props}
  />
);
