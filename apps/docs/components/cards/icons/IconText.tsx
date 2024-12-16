import type { ComponentPropsWithoutRef } from "react";

import { theme } from "@optiaxiom/globals";
import { Box } from "@optiaxiom/react";

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
            ? "border.active"
            : intent === "secondary"
              ? "border.default"
              : "bg.error.subtle"
        ],
      ...style,
    }}
    {...props}
  />
);
