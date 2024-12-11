import { Box, type Sprinkles, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

import { yellowStripes } from "../stripes";

export const Item = ({
  children,
  p,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  p?: Sprinkles["p"];
}) => {
  return (
    <Box p={p} rounded="sm" style={yellowStripes}>
      <Box
        asChild
        bg="link.fg.visited"
        display="grid"
        placeItems="center"
        py="16"
        rounded="sm"
        {...children.props}
      >
        <Text
          color="fg.default.inverse"
          fontFamily="mono"
          fontWeight="600"
          textAlign="center"
        >
          {children.props.children}
        </Text>
      </Box>
    </Box>
  );
};
