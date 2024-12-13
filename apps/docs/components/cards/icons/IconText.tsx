import type { ComponentPropsWithoutRef } from "react";

import { theme } from "@optiaxiom/globals";
import { Box } from "@optiaxiom/react";

export const IconText = ({
  intent = "primary",
  style,
  ...props
}: ComponentPropsWithoutRef<typeof Box> & {
  intent?: "primary" | "secondary";
}) => (
  <Box
    p="2"
    rounded="sm"
    style={{
      backgroundColor:
        theme.colors[intent === "primary" ? "border.active" : "border.default"],
      ...style,
    }}
    {...props}
  />
);
