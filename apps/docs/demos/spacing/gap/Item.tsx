import { Box, Text } from "@optiaxiom/react";
import {
  type ComponentPropsWithRef,
  type ReactElement,
  cloneElement,
} from "react";

export const Item = ({
  children,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
}) => {
  return cloneElement(
    children,
    {
      background: "purple.500",
      borderRadius: "inherit",
      padding: "md",
    },
    <Text color="white" fontFamily="mono" fontWeight={600} textAlign="center">
      {children.props.children}
    </Text>,
  );
};
