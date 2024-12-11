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
    <Box h={h} p="8" rounded="sm" style={yellowStripes}>
      <Item>
        <Box p="8" {...children.props} />
      </Item>
    </Box>
  );
};
