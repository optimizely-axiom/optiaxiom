import type { ComponentPropsWithRef, ReactElement } from "react";

import { Box, type Sprinkles, theme } from "@optiaxiom/react";

import { Item } from "./Item";

export const Container = ({
  children,
  h,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  h?: Sprinkles["h"];
}) => {
  return (
    <Box
      bg="purple.50"
      h={h}
      p="xs"
      rounded="sm"
      style={{
        background: `rgb(from ${theme.color["purple.500"]} r g b / 30%)`,
      }}
    >
      <Item>{children}</Item>
    </Box>
  );
};
