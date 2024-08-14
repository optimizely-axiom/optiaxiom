import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";

type DrawerFooterProps = ComponentPropsWithRef<typeof Flex>;

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex
        borderT="1"
        flexDirection="row"
        gap="md"
        justifyContent="end"
        p="md"
        ref={ref}
        {...props}
      >
        {children}
      </Flex>
    );
  },
);

DrawerFooter.displayName = "@optiaxiom/react/DrawerFooter";
