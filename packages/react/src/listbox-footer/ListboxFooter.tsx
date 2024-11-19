import { type ComponentPropsWithRef, forwardRef } from "react";

import { Flex } from "../flex";

type ListboxFooterProps = ComponentPropsWithRef<typeof Flex>;

export const ListboxFooter = forwardRef<HTMLDivElement, ListboxFooterProps>(
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

ListboxFooter.displayName = "@optiaxiom/react/ListboxFooter";
