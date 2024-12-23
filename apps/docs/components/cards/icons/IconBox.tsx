import type { ComponentPropsWithoutRef } from "react";

import { Box, theme } from "@optiaxiom/react";

export const IconBox = ({
  shadow,
  style,
  ...props
}: ComponentPropsWithoutRef<typeof Box>) => (
  <Box
    bg="bg.default"
    p="6"
    rounded="sm"
    style={{
      boxShadow: [
        `inset 0 0 0 1px color-mix(in srgb, ${theme.colors["bg.default.inverse"]} 20%, transparent)`,
        shadow && shadow !== "none" && theme.boxShadow[shadow],
      ]
        .filter(Boolean)
        .join(", "),
      ...style,
    }}
    {...props}
  />
);
