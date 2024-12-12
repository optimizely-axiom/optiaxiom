import { greenStripes } from "@/demos/stripes";
import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      display="inline-flex"
      rounded="sm"
      style={greenStripes}
      {...children.props}
    >
      <Text
        bg="bg.success.hovered"
        color="fg.default.inverse"
        fontFamily="mono"
        fontWeight="600"
        p="16"
        rounded="inherit"
      >
        {children.props.children}
      </Text>
    </Box>
  );
};
