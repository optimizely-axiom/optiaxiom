import { Box, Text, theme } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return (
    <Box
      bg="bg.avatar.purple"
      border="2"
      display="grid"
      placeItems="center"
      rounded="full"
      size="56"
      style={{
        borderColor: theme.colors["bg.default"],
        marginLeft: "-12px",
      }}
      {...children.props}
    >
      <Text fontFamily="mono" fontWeight="600">
        {children.props.children}
      </Text>
    </Box>
  );
};
