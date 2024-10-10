import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      bg={
        children.props.gridColumn || children.type === "div"
          ? "purple.500"
          : "purple.200"
      }
      display="grid"
      p="16"
      placeItems="center"
      rounded="sm"
      {...children.props}
    >
      <Text color="neutral.00" fontFamily="mono" fontWeight="600">
        {children.props.children}
      </Text>
    </Box>
  );
};
