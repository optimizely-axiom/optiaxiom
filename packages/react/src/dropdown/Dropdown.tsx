import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { type ComponentPropsWithRef, forwardRef } from "react";

import type { ExtendProps } from "../utils";

import { Flex } from "../flex";

type DropdownProps = ExtendProps<
  ComponentPropsWithRef<typeof Flex>,
  ComponentPropsWithRef<typeof RadixDropdownMenu.Root>
>;

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex alignItems="center" asChild ref={ref}>
        <RadixDropdownMenu.Root {...props}>{children}</RadixDropdownMenu.Root>
      </Flex>
    );
  },
);

Dropdown.displayName = "@optiaxiom/react/Dropdown";
