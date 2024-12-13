import type { ComponentPropsWithoutRef } from "react";

import { theme } from "@optiaxiom/globals";
import { Box, Flex } from "@optiaxiom/react";

export const IconButton = ({
  intent = "primary",
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
    style={
      intent === "primary"
        ? { backgroundColor: theme.colors["border.focus"] }
        : intent === "secondary"
          ? { boxShadow: `inset 0 0 0 1px ${theme.colors["border.default"]}` }
          : {}
    }
    {...props}
  />
);
