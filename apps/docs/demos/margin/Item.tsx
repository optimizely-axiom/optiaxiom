import { yellowStripes } from "@/demos/stripes";
import { Box, type Sprinkles, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
  p,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  p?: Sprinkles["p"];
}) => {
  return (
    <Box p={p} rounded="sm" style={yellowStripes}>
      <Box bg="bg.success.hovered" p="16" rounded="inherit" {...children.props}>
        <Text color="fg.default.inverse" fontFamily="mono" fontWeight="600">
          {children.props.children}
        </Text>
      </Box>
    </Box>
  );
};
