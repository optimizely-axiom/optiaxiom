import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";

type AlertDescriptionProps = ComponentPropsWithRef<typeof Flex>;

export const AlertDescription = forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ children, ...props }, ref) => {
  return (
    <Flex fontSize="md" fontWeight="400" ref={ref} {...props}>
      {children}
    </Flex>
  );
});

AlertDescription.displayName = "@optiaxiom/react/AlertDescription";
