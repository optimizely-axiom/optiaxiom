import { stripes } from "@/demos/stripes";
import { Box, type Sprinkles } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

import { ItemLabelInside } from "../ItemLabelInside";

export const Item = ({
  children,
  p,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  p?: Sprinkles["p"];
}) => {
  return (
    <Box p={p} rounded="sm" style={stripes}>
      <ItemLabelInside>{children}</ItemLabelInside>
    </Box>
  );
};
