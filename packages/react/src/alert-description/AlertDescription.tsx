import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";

type AlertDescriptionProps = ComponentPropsWithRef<typeof Box>;

export const AlertDescription = forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ children, ...props }, ref) => {
  return (
    <Flex gap="xs" ref={ref} {...props}>
      {children}
    </Flex>
  );
});

AlertDescription.displayName = "@optiaxiom/react/AlertDescription";
