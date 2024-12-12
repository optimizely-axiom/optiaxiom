import { yellowStripes } from "@/demos/stripes";
import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  const label = children.props.children;

  return (
    <Box rounded="md" style={yellowStripes}>
      <Box
        bg="bg.success.hovered"
        display="grid"
        p="8"
        placeItems="center"
        rounded="inherit"
        {...children.props}
      >
        <Text
          color="fg.default.inverse"
          fontFamily="mono"
          fontWeight="600"
          textAlign="center"
        >
          {label}
        </Text>
      </Box>
    </Box>
  );
};
