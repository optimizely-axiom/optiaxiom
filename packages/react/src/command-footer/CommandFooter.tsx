import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";

type CommandFooterProps = ComponentPropsWithRef<typeof Flex>;

export const CommandFooter = forwardRef<HTMLDivElement, CommandFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex
        borderColor="border.secondary"
        borderT="1"
        flexDirection="row"
        gap="md"
        justifyContent="space-between"
        p="sm"
        ref={ref}
        {...props}
      >
        {children}
      </Flex>
    );
  },
);

CommandFooter.displayName = "@optiaxiom/react/CommandFooter";
