import { yellowStripes } from "@/demos/stripes";
import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box position="relative" rounded="sm" size="128" style={yellowStripes}>
      <Box
        bg="purple.500"
        display="grid"
        placeItems="center"
        rounded="inherit"
        {...children.props}
      >
        <Text color="white" fontFamily="mono" fontWeight="600">
          {children.props.children}
        </Text>
      </Box>
    </Box>
  );
};
