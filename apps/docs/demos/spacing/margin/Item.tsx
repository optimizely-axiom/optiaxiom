import { Box, Text, theme } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
  p,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  p?: ComponentPropsWithRef<typeof Box>["p"];
}) => {
  return (
    <Box
      p={p}
      rounded="sm"
      style={{
        background: `rgb(from ${theme.color["purple.500"]} r g b / 30%)`,
      }}
    >
      <Box bg="purple.500" p="md" rounded="inherit" {...children.props}>
        <Text color="white" fontFamily="mono" fontWeight="600">
          {children.props.children}
        </Text>
      </Box>
    </Box>
  );
};
