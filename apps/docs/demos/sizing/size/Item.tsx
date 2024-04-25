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
  const label = children.props.children;

  return cloneElement(
    children,
    {
      background: "purple.500",
      borderRadius: "sm",
      place: "center",
    },
    <Text color="white" fontFamily="mono" fontWeight={600} textAlign="center">
      {label}
    </Text>,
  );
};
