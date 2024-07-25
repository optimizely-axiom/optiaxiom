import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";

type AlertTitleProps = ComponentPropsWithRef<typeof Flex>;

export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex fontWeight="600" ref={ref} {...props}>
        {children}
      </Flex>
    );
  },
);

AlertTitle.displayName = "@optiaxiom/react/AlertTitle";
