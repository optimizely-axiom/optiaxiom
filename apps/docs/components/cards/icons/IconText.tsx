import type { ComponentPropsWithoutRef } from "react";

import { Box, theme } from "@optiaxiom/react";

export const IconText = ({
  intent = "primary",
  style,
  ...props
}: ComponentPropsWithoutRef<typeof Box> & {
  intent?: "danger" | "primary" | "secondary";
}) => (
  <Box
    p="2"
    rounded="sm"
    style={{
      backgroundColor:
        theme.colors[
          intent === "primary"
            ? "border.control"
            : intent === "secondary"
              ? "border.default"
              : "bg.error.subtle"
        ],
      ...style,
    }}
    {...props}
  />
);
