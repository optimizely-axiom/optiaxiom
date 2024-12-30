import { stripes } from "@/demos/stripes";
import { Box } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

import { ItemLabelInside } from "../ItemLabelInside";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box rounded="md" style={stripes}>
      <ItemLabelInside>{children}</ItemLabelInside>
    </Box>
  );
};
