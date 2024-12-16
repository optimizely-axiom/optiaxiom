import type { ComponentPropsWithoutRef } from "react";

import { theme } from "@optiaxiom/globals";
import { Box } from "@optiaxiom/react";

export const IconBox = ({
  style,
  ...props
}: ComponentPropsWithoutRef<typeof Box>) => (
  <Box
    bg="bg.default"
    p="6"
    rounded="sm"
    style={{
      boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${theme.colors["bg.default.inverse"]} 20%, transparent)`,
      ...style,
    }}
    {...props}
  />
);
