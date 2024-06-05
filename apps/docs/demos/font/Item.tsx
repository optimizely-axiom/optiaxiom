import { Box, Text } from "@optiaxiom/react";
import { type ComponentPropsWithRef, type ReactElement } from "react";

export const Item = ({
  children,
  name,
}: {
  children: ReactElement<ComponentPropsWithRef<typeof Box>>;
  name: keyof ComponentPropsWithRef<typeof Box>;
}) => (
  <div>
    <Text color="fg.tertiary" fontFamily="mono" fontWeight="600">
      {children.props[name]}
    </Text>
    <Text {...children.props}>{children.props.children}</Text>
  </div>
);
