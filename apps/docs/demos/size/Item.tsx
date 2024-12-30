import { Box, Flex, type Sprinkles } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

import { ItemLabelInside } from "../ItemLabelInside";
import { ItemLabelOutside } from "../ItemLabelOutside";
import { yellowStripes } from "../stripes";

export const Item = ({
  children,
  p,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  p?: Sprinkles["p"];
}) => {
  return (
    <Flex alignItems={!p ? "center" : undefined} gap="8">
      {p ? (
        <Box p={p} rounded="sm" style={yellowStripes}>
          <ItemLabelInside>{children}</ItemLabelInside>
        </Box>
      ) : (
        <ItemLabelOutside>{children}</ItemLabelOutside>
      )}
    </Flex>
  );
};
