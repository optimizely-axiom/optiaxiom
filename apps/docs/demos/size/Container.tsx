import type { ComponentPropsWithRef, ReactElement } from "react";

import { yellowStripes } from "@/demos/stripes";
import { Box, type Sprinkles } from "@optiaxiom/react";

import { Item } from "./Item";

export const Container = ({
  children,
  h,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  h?: Sprinkles["h"];
}) => {
  return (
    <Box h={h} p="xs" rounded="sm" style={yellowStripes}>
      <Item>
        <Box p="xs" {...children.props} />
      </Item>
    </Box>
  );
};
