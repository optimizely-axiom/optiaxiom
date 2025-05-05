import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";

export type PillGroupProps = ComponentPropsWithRef<typeof Flex>;

export const PillGroup = forwardRef<HTMLDivElement, PillGroupProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex flexDirection="row" gap="12" ref={ref} {...props}>
        {children}
      </Flex>
    );
  },
);

PillGroup.displayName = "@optiaxiom/react/PillGroup";
