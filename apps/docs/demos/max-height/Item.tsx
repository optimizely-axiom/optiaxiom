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
    <Box
      alignItems="end"
      display="flex"
      h="full"
      rounded="md"
      style={stripes}
      {...children.props}
      maxH="full"
    >
      <ItemLabelInside>{children}</ItemLabelInside>
    </Box>
  );
};
