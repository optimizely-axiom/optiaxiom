import type { ComponentPropsWithRef, ReactElement } from "react";

import { Box, theme } from "@optiaxiom/react";

import { Item } from "./Item";

export const Container = ({
  children,
  height,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  height?: ComponentPropsWithRef<typeof Box>["height"];
}) => {
  return (
    <Box
      background="purple.50"
      borderRadius="sm"
      height={height}
      padding="xs"
      style={{
        background: `rgb(from ${theme.color["purple.500"]} r g b / 30%)`,
      }}
    >
      <Item>{children}</Item>
    </Box>
  );
};
