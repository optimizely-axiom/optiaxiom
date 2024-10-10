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
      <Box bg="purple.500" p="md" rounded="inherit" {...children.props}>
        <Text color="neutral.00" fontFamily="mono" fontWeight="600">
          {children.props.children}
        </Text>
      </Box>
    </Box>
  );
};
